const SkeletonCard = () => {
    return (
        <div className="bg-white border rounded-xl p-4 animate-pulse">
            <div className="h-48 bg-gray-100 rounded-md" />
            <div className="h-4 bg-gray-100 rounded mt-4 w-3/4" />
            <div className="h-4 bg-gray-100 rounded mt-2 w-1/2" />
            <div className="h-4 bg-gray-100 rounded mt-4 w-2/3" />
        </div>
    );
};

export { SkeletonCard };




