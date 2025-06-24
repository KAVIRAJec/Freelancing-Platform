import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { ApiResponse } from "../Models/ApiResponse.model";
import { ProjectModel } from "../Models/Project.model";
import { PaginationModel } from "../Models/PaginationModel";

@Injectable({providedIn: "root"})
export class ProjectService {
    private baseUrl: string;

    constructor(private http: HttpClient) {
        this.baseUrl = environment.baseUrl;
    }

    createProject(project: ProjectModel) {
        return this.http.post<ApiResponse<ProjectModel>>(`${this.baseUrl}/project/create`, project);
    }

    getProjectById(projectId: string) {
        return this.http.get<ApiResponse<ProjectModel>>(`${this.baseUrl}/project/${projectId}`);
    }

    getProjectsByClientId(clientId: string, page: number = 1, pageSize: number = 10) {
        return this.http.get<ApiResponse<{ data: ProjectModel[]; pagination: PaginationModel }>>(
            `${this.baseUrl}/project/client/${clientId}?page=${page}&pageSize=${pageSize}`
        );
    }
    getAllProjects(page: number = 1, pageSize: number = 10) {
        return this.http.get<ApiResponse<{ data: ProjectModel[]; pagination: PaginationModel }>>(
            `${this.baseUrl}/project?page=${page}&pageSize=${pageSize}`
        );
    }
    updateProject(projectId: string, project: ProjectModel) {
        return this.http.put<ApiResponse<ProjectModel>>(`${this.baseUrl}/project/${projectId}`, project);
    }
    deleteProject(projectId: string) {
        return this.http.delete<ApiResponse<ProjectModel>>(`${this.baseUrl}/project/${projectId}`);
    }
}