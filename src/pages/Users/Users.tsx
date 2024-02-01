import { Button, Dialog, DialogTitle, Grid } from "@mui/material"
import { UsersProvider } from "./contexts/UsersContext"
import TableUsers from "./components/TableUsers/TableUsers"
import CreateUsers from "./components/CreateUsers/CreateUsers"
import { PRIVATE_ROUTES } from "../../AppRoutes"
import { BreadCrumbItem } from "../../models/common/breadcrumbItem.model"
import Breadcrumb from "../../components/Breadcrumb"
import { useState } from "react"
import './Users.css';
import DashboardUsers from "./components/DashboardUsers/DashboardUsers"
import { useTranslation } from "react-i18next"

const Users = () => {
  const [openCreate, setOpenCreate] = useState(false);
  const { t } = useTranslation();
  const breadItems: BreadCrumbItem[] = [
    {
      label: 'Home',
      url: PRIVATE_ROUTES.HOME
    },
    {
      label: 'Usuarios',
      url: PRIVATE_ROUTES.ADMIN_USERS,
      active: true
    },
  ];

  const handleOpenCreate = () => {
    setOpenCreate(true);
  }

  const handleCloseCreate = () => {
    setOpenCreate(false);
  }

  return (
    <div className="container">
      <Breadcrumb items={breadItems} />
      <h2 className="title">{ t('home.manageUsers')}</h2>
      <div className="content-users">
        <DashboardUsers />
        <Button
          className="button-add-user"
          variant="contained"
          color="primary"
          onClick={handleOpenCreate}
        >Crear usuario</Button>

        <UsersProvider signal={false} sendSignal={() => { }} >
          <TableUsers></TableUsers>
          <Dialog maxWidth={'lg'} onClose={handleCloseCreate} open={openCreate}>
            <DialogTitle>Crear usuario</DialogTitle>
            <CreateUsers onCreate={handleCloseCreate}></CreateUsers>
          </Dialog>
        </UsersProvider>
      </div>
    </div >
  )
}

export default Users