import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ComponentItem } from '../store/useComponentStore';

interface SortableComponentProps {
	id: string;
	component: ComponentItem;
	onRemove: () => void;
}

const SortableComponent: React.FC<SortableComponentProps> = ({
	id,
	component,
	onRemove,
}) => {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({
		id,
		transition: {
			duration: 150,
			easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
		},
	});

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		opacity: isDragging ? 0.5 : 1,
		zIndex: isDragging ? 999 : 'auto',
		touchAction: 'none',
	};

	// 根據元件類型呈現不同圖標
	const getIcon = () => {
		if (component.type === 'carousel') {
			return (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-5 w-5"
					viewBox="0 0 20 20"
					fill="currentColor">
					<path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
				</svg>
			);
		} else if (component.type === 'product') {
			return (
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
			);
		}
		return null;
	};

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
			className="bg-white border border-gray-200 rounded-md p-3 shadow-sm cursor-move hover:border-blue-300 transition-all duration-150 relative mb-2 transform-gpu will-change-transform">
			<div className="flex items-center">
				<div className="mr-2 text-blue-500">{getIcon()}</div>
				<span className="font-medium">{component.title}</span>
				<button
					onClick={(e) => {
						e.stopPropagation();
						console.log('Remove button clicked for component:', component.id);
						onRemove();
					}}
					className="absolute right-2 top-2 text-gray-400 hover:text-red-500 transition-colors duration-150"
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
			</div>
		</div>
	);
};

export default SortableComponent;
