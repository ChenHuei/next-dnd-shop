import React from 'react';

const ComponentProperties: React.FC = () => {
	return (
		<div className="bg-blue-50 rounded-lg border border-blue-200 overflow-hidden">
			<div className="bg-blue-100 py-3 px-4 border-b border-blue-200">
				<h2 className="font-medium text-blue-800">元件屬性</h2>
			</div>
			<div className="p-4">
				<div className="bg-white rounded-md border border-gray-200 p-4 shadow-sm">
					<div className="text-center mb-3">
						<span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-md">
							圖片設定
						</span>
					</div>
					<div className="border border-gray-200 rounded-md bg-gray-50 p-3 flex flex-col items-center justify-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-8 w-8 text-gray-400 mb-1"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
							/>
						</svg>
						<span className="text-xs text-gray-500">上傳圖片</span>
						<span className="text-xs text-gray-400 mt-1">或預覽</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ComponentProperties;
