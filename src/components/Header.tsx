import React from 'react';

const Header: React.FC = () => {
	return (
		<div className="bg-blue-50 p-4 border-b border-blue-100">
			<h1 className="text-xl font-semibold text-blue-800">拖放式表單設計器</h1>
			<p className="text-sm text-blue-600 mt-1">
				拖曳左側元件到中間區域來設計您的表單
			</p>
			<div className="mt-2 p-2 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 text-xs">
				<p>
					<strong>使用說明：</strong>
				</p>
				<ul className="list-disc pl-4 mt-1 space-y-1">
					<li>拖曳「輪播」或「商品」元件到預覽區</li>
					<li>元件進入預覽區後，可以上下拖曳調整順序</li>
					<li>點擊元件右上角的 X 可以移除元件</li>
					<li>只有拖曳至預覽區域才會被加入</li>
				</ul>
			</div>
		</div>
	);
};

export default Header;
