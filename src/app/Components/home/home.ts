import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../Services/client.service';
import { FreelancerService } from '../../Services/freelancer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit {
  projectCount: number = 0;
  freelancerCount: number = 0;

  animatedProjectCount: number = 0;
  animatedFreelancerCount: number = 0;

  public clients: any[] = [];
  public currentYear: number = new Date().getFullYear();

  constructor(
    private clientService: ClientService,
    private freelancerService: FreelancerService
  ) {}

  ngOnInit(): void {
    // Fetch clients for the carousel and count projects
    this.clientService.getAllClients().subscribe({
      next: (response: any) => {
        const projects = Array.isArray(response.data) ? response.data : [];
        this.projectCount = projects.length;
        this.animateCount('project', this.projectCount);
        this.clients = projects.map((client: any) => ({ ...client }));
      },
      error: (err: any) => console.error('Error fetching clients', err)
    });

    // Fetch all freelancers and count
    this.freelancerService.getAllFreelancers(1, 1000).subscribe({
      next: (response: any) => {
        const freelancers = Array.isArray(response.data?.data) ? response.data.data : [];
        this.freelancerCount = freelancers.length;
        this.animateCount('freelancer', this.freelancerCount);
      },
      error: (err: any) => console.error('Error fetching freelancers', err)
    });
  }

  animateCount(type: 'project' | 'freelancer', target: number) {
    let current = 0;
    const duration = 6000; // 6 seconds
    const intervalTime = 20; // ms
    const steps = Math.ceil(duration / intervalTime);
    const increment = Math.ceil(target / steps);
    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(interval);
      }
      if (type === 'project') this.animatedProjectCount = current;
      if (type === 'freelancer') this.animatedFreelancerCount = current;
    }, intervalTime);
  }
}