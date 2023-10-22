<script>
	import { user } from '../../stores/login.store';
</script>

<h3>Login</h3>
<button
	on:click={() => {
		user.login();
	}}
	class="btn btn-sm btn-light">Login</button
>
<button
	on:click={() => {
		user.logout();
	}}
	class="btn btn-sm btn-light">Logout</button
>
