import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
export function PaginationDemo({ totalPages, pages, setPages }) {
    const getPageNumbers = () => {
        let page = [];

        if (pages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                page.push(i);
            }

        }
        else {
            page.push(1);
            page.push('ellipsis-left');
            for (let i = 7; i <= totalPages; i++) {
                page.push(i);
            }
        }
        return page
    }
    let pageNumber = getPageNumbers();
    return (
        <div className="bg-white rounded-lg  overflow-hidden  flex justify-center items-center p-1">
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious onClick={() => setPages(pages > 1 ? pages - 1 : pages)} />
                    </PaginationItem>


                    {pageNumber.map((page, index) => (
                        typeof page === "number" ? (
                            <PaginationItem key={index}>
                                <PaginationLink onClick={() => setPages(page)} isActive={page === pages}>
                                    {page}
                                </PaginationLink>
                            </PaginationItem>
                        )
                            :
                            <PaginationItem key={index}>
                                <PaginationEllipsis />
                            </PaginationItem>
                    )
                    )}


                    <PaginationItem>
                        <PaginationNext onClick={() => setPages(pages < totalPages ? pages + 1 : pages)} />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}
