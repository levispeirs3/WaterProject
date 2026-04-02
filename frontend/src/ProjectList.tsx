import { useEffect, useState } from "react";
import type { Project } from './types/Project';

function ProjectList({selectedCategories}: {selectedCategories: string[] }) {
    const [projects, setProjects] = useState<Project[]>([]);
    const [pageSize, setPageSize] = useState<number>(10);
    const [pageNum, setPageNum] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);

    useEffect(() => {
        const fetchProjects = async () => {

            const categoryParams = selectedCategories
                .map((cat) => `projectTypes=${encodeURIComponent(cat)}`)
                .join('&');

            const response = await fetch(
                `https://localhost:5000/Water/AllProjects?pageSize=${pageSize}&pageNum=${pageNum}${selectedCategories.length ? `&${categoryParams}` : ``}`
            );
            const data = await response.json();
            setProjects(data.projects);
            setTotalItems(data.totalNumProjects);
            setTotalPages(Math.ceil(totalItems / pageSize));
        };

        fetchProjects();
    }, [pageSize, pageNum, totalItems, selectedCategories]);

    return (
        <>
            {projects.map((p) => (
                <div id="projectCard" className="card">
                    <h3 className="card-title">{p.projectName}</h3>
                    <div className="card-body" key={p.projectId}>
                        <ul className="list-unstyled">
                            <li><strong>Project Type:</strong> {p.projectType}</li>
                            <li><strong>Regional Program:</strong> {p.projectRegionalProgram}</li>
                            <li><strong>Impact:</strong> {p.projectImpact} Individuals Served</li>
                            <li><strong>Project Phase:</strong> {p.projectPhase}</li>
                            <li><strong>Project Status:</strong> {p.projectFunctionalityStatus}</li>
                        </ul>
                    </div>
                </div>
            ))}

            <div className="d-flex flex-column align-items-center gap-3 mt-4">
                <nav aria-label="Project pagination">
                    <ul className="pagination pagination-sm mb-0">
                        <li className={`page-item ${pageNum === 1 ? 'disabled' : ''}`}>
                            <button className="page-link" disabled={pageNum === 1} onClick={() => setPageNum(pageNum -1)}>Previous</button>
                        </li>

                        {[...Array(totalPages)].map((_, i) => (
                            <li className={`page-item ${pageNum === (i + 1) ? 'active' : ''}`} key={i + 1}>
                                <button 
                                    className="page-link"
                                    onClick={() => setPageNum(i + 1)} 
                                    disabled={pageNum === (i + 1)}
                                >
                                    {i + 1}
                                </button>
                            </li>
                        ))}

                        <li className={`page-item ${pageNum === totalPages ? 'disabled' : ''}`}>
                            <button className="page-link" disabled={pageNum === totalPages} onClick={() => setPageNum(pageNum + 1)}>Next</button>
                        </li>
                    </ul>
                </nav>

                <div className="d-inline-flex align-items-center gap-2">
                    <label className="form-label mb-0" htmlFor="pageSize">Results per page:</label>
                    <select 
                        id="pageSize"
                        className="form-select form-select-sm w-auto"
                        value={pageSize} 
                        onChange={(p) => {
                            setPageSize(Number(p.target.value));
                            setPageNum(1);
                    }}
                    >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                    </select>
                </div>
            </div>
        </>
    );
}

export default ProjectList; 
