import { PRIVATE_ROUTES } from "../../AppRoutes";
import Breadcrumb from "../../components/Breadcrumb"
import { BreadCrumbItem } from "../../models/common/breadcrumbItem.model";

const breadItems: BreadCrumbItem[] = [
    {
        label: 'Home',
        url: PRIVATE_ROUTES.HOME
    },
    {
        label: 'Busquedas',
        url: PRIVATE_ROUTES.SEARCH,
        active: true
    },
];

const Search = () => {
    return (
        <div className="container">
            <Breadcrumb items={breadItems} />
            <h2 className="title">Busquedas</h2>
        </div>
    )
}

export default Search