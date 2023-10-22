<script>
	import { user } from '../../stores/login.store';
</script>

<h3>User</h3>
<button
	on:click={() => {
		user.logout();
	}}
	class="btn btn-sm btn-light">Logout</button
>
