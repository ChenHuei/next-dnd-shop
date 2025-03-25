import { create } from 'zustand';

export type ComponentType = 'carousel' | 'product';

export interface ComponentItem {
	id: string;
	type: ComponentType;
	title: string;
}

interface ComponentState {
	components: ComponentItem[];
	addComponent: (type: ComponentType) => void;
	removeComponent: (id: string) => void;
	reorderComponents: (activeId: string, overId: string) => void;
	insertComponent: (type: ComponentType, index: number) => void;
}

export const useComponentStore = create<ComponentState>((set) => ({
	components: [],

	addComponent: (type: ComponentType) =>
		set((state) => {
			const newItem: ComponentItem = {
				id: `${type}-${Date.now()}`,
				type,
				title: type === 'carousel' ? '輪播' : '商品',
			};

			return {
				components: [...state.components, newItem],
			};
		}),

	removeComponent: (id: string) =>
		set((state) => {
			console.log('Removing component with id:', id);
			console.log('Current components:', state.components);
			const newComponents = state.components.filter((item) => item.id !== id);
			console.log('New components:', newComponents);
			return {
				components: newComponents,
			};
		}),

	reorderComponents: (activeId: string, overId: string) =>
		set((state) => {
			const oldIndex = state.components.findIndex(
				(item) => item.id === activeId,
			);
			const newIndex = state.components.findIndex((item) => item.id === overId);

			if (oldIndex === -1 || newIndex === -1) return state;

			const newComponents = [...state.components];
			const [removed] = newComponents.splice(oldIndex, 1);
			newComponents.splice(newIndex, 0, removed);

			return { components: newComponents };
		}),

	insertComponent: (type: ComponentType, index: number) =>
		set((state) => {
			const newItem: ComponentItem = {
				id: `${type}-${Date.now()}`,
				type,
				title: type === 'carousel' ? '輪播' : '商品',
			};

			const newComponents = [...state.components];
			newComponents.splice(index, 0, newItem);

			return {
				components: newComponents,
			};
		}),
}));
