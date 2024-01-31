export class ResultPage<T> {
    constructor(
        public data: T[],
        public page: number,
        public size: number,
        public total: number,
    ) { }
}