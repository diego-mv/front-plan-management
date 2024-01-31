export class BreadCrumbItem {
    constructor(
        public label: string,
        public url: string,
        public active?: boolean
    ) { }
}