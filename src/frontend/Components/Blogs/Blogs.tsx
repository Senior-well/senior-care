import React from "react";

interface BlogsProps {
    title: string;
    description: string;
    thumbnail: any;
}

const Blogs: React.FC<BlogsProps> = ({title, description, thumbnail}) => {
    return (
        <div className="blogs">
            
        </div>
    )
};

export default Blogs;