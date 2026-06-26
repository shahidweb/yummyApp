import { computed, Injectable, signal } from "@angular/core";
import { IUser, ROLES } from "./auth.model";

@Injectable({
    providedIn: 'root'
})

export class AuthStore {
    private readonly _user = signal<IUser | null>(null);
    readonly user = this._user.asReadonly();
    readonly isAuthenticated = computed(() => !!this._user());

    readonly isAdmin = computed(() => this._user()?.role === ROLES.ADMIN);
    readonly isUser = computed(() => this._user()?.role === ROLES.USER);

    get currentUser(): IUser | null { return this._user() }

    setUser(user: IUser): void { this._user.set(user); }
    clear(): void { this._user.set(null) }
    updateUser(user: Partial<IUser>): void {
        this._user.update(current => current ? { ...current, ...user } : null);
    }




}