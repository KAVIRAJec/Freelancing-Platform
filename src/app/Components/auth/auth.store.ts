import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { CreateClientModel } from '../../Models/Client.model';
import { CreateFreelancerModel } from '../../Models/Freelancer.model';
import * as ClientActions from '../../NgRx/Client/client.actions';
import * as FreelancerActions from '../../NgRx/Freelancer/freelancer.actions';

export function registerUserByRole(store: Store, role: 'client' | 'freelancer', data: any) {
  if (role === 'client') {
    store.dispatch(ClientActions.addClient({ client: data as CreateClientModel }));
  } else {
    store.dispatch(FreelancerActions.addFreelancer({ freelancer: data as CreateFreelancerModel }));
  }
}
