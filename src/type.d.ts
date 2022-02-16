declare module "*.svg";

interface ICategory {
    id: string
    title: string
}

interface ITask {
    id: string
    categoryId: string
    title: string
    details?: string
    isDone: boolean
}

interface AddUpdateTaskFormData {
    title: string
    details?: string
    category?: {
        value: string
        label: string
    }
}

interface AddUpdateCategoryFormData {
    title: string
}

interface TaskProps {
    task: ITask
}
