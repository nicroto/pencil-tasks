import { TestBed } from '@angular/core/testing';

import { ServerSyncService } from './server-sync.service';

describe('ServerSyncService', () => {
  let service: ServerSyncService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServerSyncService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
