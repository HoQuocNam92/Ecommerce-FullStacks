const BackButton = ({ navigate }) => {
    return (
        <div className="flex justify-end">
            <button
                onClick={() => navigate(-1)}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
            >
                Quay lại
            </button>
        </div>
    );
};

export default BackButton;
