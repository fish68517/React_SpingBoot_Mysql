import React from 'react';

const UploadPage = () => (
    <div className="container mx-auto max-w-2xl">
        <h2 className="text-4xl font-bold text-center mb-8">上传你的作品</h2>
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
            <div className="mb-6">
                <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="photo-upload">
                    选择图片文件
                </label>
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 hover:bg-gray-700 transition">
                    <p className="text-gray-400">拖拽文件到这里, 或点击选择</p>
                    <input type="file" id="photo-upload" className="opacity-0 absolute" multiple />
                </div>
            </div>
            <div className="mb-4">
                <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="title">
                    作品标题
                </label>
                <input className="w-full bg-gray-900 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" id="title" type="text" placeholder="例如：黄昏下的思考" />
            </div>
            <div className="mb-6">
                <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="description">
                    作品描述 / 创作思路
                </label>
                <textarea className="w-full bg-gray-900 rounded-lg p-3 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500" id="description" placeholder="分享你的创作故事..."></textarea>
            </div>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition text-lg">
                发布作品
            </button>
        </div>
    </div>
);

export default UploadPage;