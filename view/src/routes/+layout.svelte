<script>
	import { user } from '../stores/login.store';

	let username = 'User';

	let userlogin = false;

	user.subscribe((val) => (userlogin = val));
</script>

<svelte:head>
	<link
		href="https://fonts.googleapis.com/css?family=Source+Code+Pro&display=swap"
		rel="stylesheet"
	/>
	<link
		href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"
		rel="stylesheet"
		integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD"
		crossorigin="anonymous"
	/>
	<script
		src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"
		integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN"
		crossorigin="anonymous"
	></script>
</svelte:head>
<nav class="navbar navbar-expand-lg bg-body-tertiary">
	<div class="container-fluid">
		<a class="navbar-brand" href="/">BBG-App</a>
		<button
			class="navbar-toggler"
			type="button"
			data-bs-toggle="collapse"
			data-bs-target="#navbarSupportedContent"
			aria-controls="navbarSupportedContent"
			aria-expanded="false"
			aria-label="Tootle Navigation"
		>
			<span class="navbar-toggler-icon" />
		</button>
		<div class="collapse navbar-collapse" id="navbarSupportedContent">
			<ul class="navbar-nav me-auto mb-2 mb-lg-0">
				<li class="nav-item">
					<a class="nav-link" href="/">Home</a>
				</li>
				<li class="nav-item dropdown">
					<a class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" href=" "
						>Erfassung</a
					>
					<ul class="dropdown-menu">
						<li>
							<a class="dropdown-item " href="/erfassung/etiketten">Etiketten</a>
						</li>
						<li>
							<a class="dropdown-item disabled" href="/erfassung/eingangserfassung"
								>Eingangs erfassung</a
							>
						</li>
						<li>
							<a class="dropdown-item" href="/erfassung/alphachecker">Alphachecker</a>
						</li>
						<li>
							<a class="dropdown-item" href="/erfassung/komponenten">Komponenten</a>
						</li>
						<li>
							<a class="dropdown-item" href="/erfassung/hddbenchmark">HDD-Benchmarks</a>
						</li>
						<li>
							<a class="dropdown-item" href="/erfassung/monitore">Monitore</a>
						</li>
						<li>
							<a class="dropdown-item" href="/erfassung/drucker">Drucker</a>
						</li>
						<li>
							<a class="dropdown-item" href="/erfassung/LadeNetzteile">LadeNetzteile</a>
						</li>
					</ul>
				</li>
				<li class="nav-item dropdown">
					<a class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" href=" "
						>Systeme</a
					>
					<ul class="dropdown-menu">
						<li>
							<a class="dropdown-item " href="/systeme/pcs">PCs</a>
						</li>
					</ul>
				</li>
			</ul>
			<ul class="navbar-nav mb-2 mb-lg-0">
				<li class="nav-item">
					{#if userlogin}
						<a class="nav-link" href="/user">{username}</a>
					{:else}
						<a class="nav-link" href="/login">Login</a>
					{/if}
				</li>
			</ul>
		</div>
	</div>
</nav>
<main style="font-family: 'Source Code Pro', monospace;" class="m-1">
	<slot />
</main>
<!-- <main class="m-3">
	<nav>
		<ul class="nav">
			<li class="nav-item mx-1"><a href="/">Home</a></li>
			<ul class="nav">
				<li class="nav-item">Erfassung</li>
				<ul>
					<li class="nav-item mx-1"><a href="/erfassung/alphachecker">Alphachecker</a></li>
					<li class="nav-item mx-1">Komponenten</li>
					<li class="nav-item mx-1">HDD-Benchmarks</li>
					<li class="nav-item mx-1"><a href="/erfassung/monitore">Monitore</a></li>
				</ul>
			</ul>
		</ul>
	</nav>
	<slot />
</main> -->
