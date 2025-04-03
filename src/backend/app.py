import matplotlib
matplotlib.use('Agg')  # Use Agg backend for generating plots without GUI
import matplotlib.pyplot as plt
from flask import Flask, request, jsonify
import pandas as pd
import os
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import IsolationForest
import base64
from io import BytesIO
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/upload": {"origins": "http://localhost:3000"}})

# Ensure the 'Uploads' folder exists
UPLOAD_FOLDER = os.path.join(os.getcwd(), 'Uploads')
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['ALLOWED_EXTENSIONS'] = {'csv'}

# Check if the file extension is allowed
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']

# Predict future values based on linear regression
def predict_future(df, column_name):
    df = df.dropna(subset=[column_name])  # Remove rows with NaN values in the specified column
    X = (df.index - df.index.min()).days.values.reshape(-1, 1)  # Convert dates to days
    y = df[column_name].values
    model = LinearRegression()
    model.fit(X, y)
    future_day = (df.index[-1] - df.index.min()).days + 1  # Predict for the next day
    return model.predict([[future_day]])[0]

# Anomaly detection using Isolation Forest
def detect_anomalies(df, column_name):
    df = df.dropna(subset=[column_name])  # Remove rows with NaN values in the specified column
    model = IsolationForest(contamination=0.05)
    anomalies = model.fit_predict(df[[column_name]])
    df['anomaly'] = anomalies
    return df[df['anomaly'] == -1]  # Return the rows marked as anomalies

# Generate plot for the data trends
def generate_plot(df):
    plt.figure(figsize=(10, 6))
    plt.plot(df.index, df['heart_rate'], label='Heart Rate', marker='o', linestyle='-')
    plt.plot(df.index, df['steps'], label='Steps', marker='s', linestyle='--')
    plt.xlabel('Time')
    plt.ylabel('Values')
    plt.title('Heart Rate and Steps Over Time')
    plt.legend()
    
    # Save plot to a BytesIO object and convert it to base64
    img = BytesIO()
    plt.savefig(img, format='png')
    img.seek(0)
    plot_img = base64.b64encode(img.getvalue()).decode('utf-8')
    return plot_img

@app.route("/upload", methods=["POST"])
def upload():
    insights = []
    plot_img = None

    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']

    if file.filename == '' or not allowed_file(file.filename):
        return jsonify({"error": "Invalid file format. Only CSV files are allowed."}), 400

    # Save the uploaded file
    filename = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
    file.save(filename)

    try:
        # Load CSV into DataFrame
        uploaded_data = pd.read_csv(filename, parse_dates=['time'], index_col='time')

        # Perform analysis
        predicted_heart_rate = predict_future(uploaded_data, 'heart_rate')
        predicted_steps = predict_future(uploaded_data, 'steps')

        insights.append(f"Predicted future heart rate: {predicted_heart_rate:.2f} bpm.")
        insights.append(f"Predicted future steps: {predicted_steps:.2f}.")

        anomalies = detect_anomalies(uploaded_data, 'heart_rate')
        if not anomalies.empty:
            anomalies_html = anomalies.to_html()
            insights.append(f"Anomalies detected in heart rate:<br>{anomalies_html}")
        else:
            insights.append("No anomalies detected in heart rate.")

        # Generate the plot
        plot_img = generate_plot(uploaded_data)

    except Exception as e:
        return jsonify({"error": f"Error processing data: {str(e)}"}), 500

    return jsonify({"insights": insights, "plot_img": plot_img})

if __name__ == "__main__":
    app.run(debug=True)
