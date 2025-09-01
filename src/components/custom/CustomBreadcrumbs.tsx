import { SlashIcon } from "lucide-react"
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "../ui/breadcrumb"
import { Link } from "react-router"

interface Breadcrumb {
    to: string;
    label: string;
}

interface Props {
    currentPage: string;
    breadcrumbs?: Breadcrumb[]
}

export const CustomBreadcrumbs = ({ currentPage, breadcrumbs }: Props) => {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                {/* Home */}
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link to='/'>Inicio</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                    <SlashIcon />
                </BreadcrumbSeparator>

                {breadcrumbs && breadcrumbs.map(crumb => (
                    <>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link to={crumb.to}>{crumb.label}</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator>
                            <SlashIcon />
                        </BreadcrumbSeparator>
                    </>
                ))}
                <BreadcrumbItem>
                    {currentPage}
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    )
}
