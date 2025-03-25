import React, { useState } from 'react';
import {
	DndContext,
	DragOverlay,
	DragStartEvent,
	DragEndEvent,
	pointerWithin,
	defaultDropAnimationSideEffects,
	DropAnimation,
	MeasuringStrategy,
} from '@dnd-kit/core';
import { ComponentType, useComponentStore } from '../store/useComponentStore';
import DraggableComponent from './DraggableComponent';
import DroppablePreview from './DroppablePreview';
import Header from './Header';
import ComponentProperties from './ComponentProperties';
import ComponentList from './ComponentList';

interface DndLayoutProps {
	children?: React.ReactNode;
}

interface DragData {
	type?: ComponentType;
	title?: string;
	isPreview?: boolean;
}

const dropAnimation: DropAnimation = {
	sideEffects: defaultDropAnimationSideEffects({
		styles: {
			active: {
				opacity: '0.5',
			},
		},
	}),
};

export const DndLayout: React.FC<DndLayoutProps> = ({ children }) => {
	const {
		components,
		addComponent,
		removeComponent,
		reorderComponents,
		insertComponent,
	} = useComponentStore();
	const [activeId, setActiveId] = useState<string | null>(null);
	const [activeData, setActiveData] = useState<DragData | null>(null);

	// 拖拽開始時保存目前拖動的元件ID
	const handleDragStart = (event: DragStartEvent) => {
		const { active } = event;
		setActiveId(active.id as string);
		setActiveData((active.data.current as DragData) || null);
	};

	// 拖拽結束處理
	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;

		if (!over) {
			setActiveId(null);
			setActiveData(null);
			return;
		}

		// 如果放置在預覽區域
		if (over.id === 'preview-area') {
			const type = active.data.current?.type;
			if (type && !active.data.current?.isPreview) {
				addComponent(type as ComponentType);
			}
		}
		// 如果是預覽區域內部元件的重新排序
		else if (active.id !== over.id) {
			if (active.data.current?.isPreview) {
				// 如果是預覽區域內的元件重新排序
				reorderComponents(active.id as string, over.id as string);
			} else {
				// 如果是從左側拖入新元件
				const type = active.data.current?.type;
				if (type) {
					const overIndex = components.findIndex((item) => item.id === over.id);
					if (overIndex !== -1) {
						// 在指定位置插入新元件
						insertComponent(type as ComponentType, overIndex);
					}
				}
			}
		}

		setActiveId(null);
		setActiveData(null);
	};

	// 渲染拖動中覆蓋層
	const renderDragOverlay = () => {
		if (!activeId || !activeData) return null;

		if (activeData.type === 'carousel') {
			return (
				<DraggableComponent
					id={activeId}
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
					isPreview={activeData.isPreview}
				/>
			);
		} else if (activeData.type === 'product') {
			return (
				<DraggableComponent
					id={activeId}
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
					isPreview={activeData.isPreview}
				/>
			);
		}

		return null;
	};

	return (
		<div className="min-h-screen bg-gray-50 p-6">
			<div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
				{/* 頂部標題 */}
				<Header />

				<div className="p-6">
					{/* DndContext包裹整個拖放區域 */}
					<DndContext
						onDragStart={handleDragStart}
						onDragEnd={handleDragEnd}
						collisionDetection={pointerWithin}
						measuring={{
							droppable: {
								strategy: MeasuringStrategy.Always,
							},
						}}
						modifiers={[]}>
						{/* 主要內容區 */}
						<div className="flex flex-col md:flex-row gap-6">
							{/* 元件種類區域 */}
							<div className="md:w-1/4">
								<ComponentList />
							</div>

							{/* 預覽區域 */}
							<div className="md:w-2/4">
								<DroppablePreview
									components={components}
									onRemoveComponent={removeComponent}
								/>
							</div>

							{/* 元件資訊區域 */}
							<div className="md:w-1/4">
								<ComponentProperties />
							</div>
						</div>

						{/* 拖動時的覆蓋層 */}
						<DragOverlay dropAnimation={dropAnimation}>
							{renderDragOverlay()}
						</DragOverlay>
					</DndContext>
				</div>
				{children}
			</div>
		</div>
	);
};

export default DndLayout;
