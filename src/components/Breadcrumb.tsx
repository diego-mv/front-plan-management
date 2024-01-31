import { Breadcrumbs, Link } from '@mui/material'
import { FC } from 'react'
import { BreadCrumbItem } from '../models/common/breadcrumbItem.model'

interface Props {
    items: BreadCrumbItem[]
}

const Breadcrumb: FC<Props> = ({ items }) => {
    return (
        <Breadcrumbs aria-label="breadcrumb">
            {
                items.map((item) => (
                    <Link
                        key={item.label}
                        underline="hover"
                        color={item.active ? "text.primary" : "inherit"}
                        href={item.url}
                    >
                        {item.label}
                    </Link>
                ))
            }
        </Breadcrumbs>
    )
}

export default Breadcrumb