export interface Todo {
    id: string;
    content: string;
    progress: 'active' | 'completed' | 'deleted' | 'postponed';
}