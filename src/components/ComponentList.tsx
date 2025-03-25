import React from 'react';
import DraggableComponent from './DraggableComponent';

const ComponentList: React.FC = () => {
	return (
		<div className="bg-orange-50 rounded-lg border border-orange-200 overflow-hidden">
			<div className="bg-orange-100 py-3 px-4 border-b border-orange-200">
				<h2 className="font-medium text-orange-800">元件種類</h2>
			</div>
			<div className="p-4 space-y-3">
				<DraggableComponent
					id="component-carousel"
					type="carousel"
					title="輪播"
					icon={
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							viewBox="0 0 20 20"
							fill="currentColor">
							<path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
						</svg>
					}
					description="用於展示多張圖片或內容"
				/>

				<DraggableComponent
					id="component-product"
					type="product"
					title="商品"
					icon={
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							viewBox="0 0 20 20"
							fill="currentColor">
							<path
								fillRule="evenodd"
								d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
								clipRule="evenodd"
							/>
						</svg>
					}
					description="添加商品展示元件"
				/>
			</div>
		</div>
	);
};

export default ComponentList;
