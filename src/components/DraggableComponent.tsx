import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { ComponentType } from './store/useComponentStore';

interface DraggableComponentProps {
	id: string;
	type: ComponentType;
	title: string;
	icon: React.ReactNode;
	description?: string;
	isPreview?: boolean;
	onRemove?: () => void;
}

export const DraggableComponent: React.FC<DraggableComponentProps> = ({
	id,
	type,
	title,
	icon,
	description,
	isPreview = false,
	onRemove,
}) => {
	const { attributes, listeners, setNodeRef, transform, isDragging } =
		useDraggable({
			id,
			data: { type, title, isPreview },
		});

	const style = {
		transform: CSS.Translate.toString(transform),
		opacity: isDragging ? 0.5 : 1,
		zIndex: isDragging ? 999 : 'auto',
	};

	// 預覽區域內和元件類型區的不同渲染方式
	if (isPreview) {
		return (
			<div
				ref={setNodeRef}
				style={style}
				{...attributes}
				{...listeners}
				className="bg-white border border-gray-200 rounded-md p-3 shadow-sm cursor-move hover:border-blue-300 transition-colors relative mb-2">
				<div className="flex items-center">
					<div className="mr-2 text-blue-500">{icon}</div>
					<span className="text-gray-500 font-medium">{title}</span>
					{onRemove && (
						<button
							onClick={onRemove}
							className="absolute right-2 top-2 text-gray-400 hover:text-red-500"
							aria-label="移除元件">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-4 w-4"
								viewBox="0 0 20 20"
								fill="currentColor">
								<path
									fillRule="evenodd"
									d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
									clipRule="evenodd"
								/>
							</svg>
						</button>
					)}
				</div>
			</div>
		);
	}

	// 元件類型區域渲染
	return (
		<div
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
			className="bg-white border border-purple-300 rounded-md p-3 shadow-sm cursor-move hover:border-purple-500 transition-colors">
			<div className="flex items-center">
				<div className="mr-2 text-purple-500">{icon}</div>
				<span className="text-gray-500 font-medium">{title}</span>
			</div>
			{description && (
				<p className="text-xs text-gray-500 mt-1">{description}</p>
			)}
		</div>
	);
};

export default DraggableComponent;
