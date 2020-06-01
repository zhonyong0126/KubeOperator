import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {BaseModelComponent} from '../../../shared/class/BaseModelComponent';
import {Host, HostCreateRequest} from '../host';
import {HostService} from '../host.service';
import {NgForm} from '@angular/forms';
import {CredentialService} from '../../setting/credential/credential.service';
import {Credential} from '../../setting/credential/credential';

@Component({
    selector: 'app-host-create',
    templateUrl: './host-create.component.html',
    styleUrls: ['./host-create.component.css']
})
export class HostCreateComponent extends BaseModelComponent<Host> implements OnInit {

    opened = false;
    isSubmitGoing = false;
    item: HostCreateRequest = new HostCreateRequest();
    credentials: Credential[] = [];
    @ViewChild('hostForm') hostForm: NgForm;
    @Output() created = new EventEmitter();

    constructor(private hostService: HostService, private credentialService: CredentialService) {
        super(hostService);
    }

    ngOnInit(): void {
    }

    open() {
        this.credentialService.list().subscribe(data => {
            this.credentials = data.items;
        });
        this.opened = true;
        this.item = new HostCreateRequest();
        this.hostForm.resetForm();
    }

    onCancel() {
        this.opened = false;
    }

    onSubmit() {
        this.isSubmitGoing = true;
        this.service.create(this.item).subscribe(data => {
            this.opened = false;
            this.isSubmitGoing = false;
            this.created.emit();
        });
    }
}