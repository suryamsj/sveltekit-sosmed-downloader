<script>
	import { enhance } from '$app/forms';
	import Loader from '$lib/components/Loader.svelte';

	let loading = false;

	/** @type {import('./$types').ActionData} */
	export let form;

	const handleSubmit = () => {
		loading = true;
		return async ({ result, update }) => {
			switch (result.type) {
				case 'success':
					if (result.data.success) {
						open();
					}
					break;
				default:
					break;
			}
			loading = false;
			await update();
		};
	};
</script>

<svelte:head>
	<title>Sosmed Downloader - Tiktok</title>
	<meta
		name="description"
		content="Download vidio maupun audio dari Tiktok menjadi lebih mudah dan simple."
	/>
</svelte:head>
<section class="py-5">
	<div class="container">
		<div class="row mb-3">
			<div class="col-lg-12 col-md-12 col-12">
				<h1 class="title">Tiktok Downloader</h1>
				<p class="description">Website untuk mendownload vidio tiktok tanpa watermark.</p>
			</div>
		</div>
		<div class="row justify-content-center mb-3">
			<div class="col-lg-6 col-md-12 col-12">
				<form action="" method="post" class="form-tiktok" use:enhance={handleSubmit}>
					<div class="mb-3">
						<input
							type="url"
							class="form-control {form?.success === false ? 'form-error' : ''}"
							name="url"
							required
						/>
						{#if form?.success === false}
							<p class="error">{form?.message}</p>
						{/if}
					</div>
					<div class="mb-3">
						{#if loading}
							<button class="btn btn-submit mb-3" type="button" disabled>
								<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
								Loading...
							</button>
						{:else}
							<button type="submit" class="btn btn-submit mb-3">Submit</button>
						{/if}
						<a href="/" class="btn btn-back">Back</a>
					</div>
				</form>
			</div>
		</div>
		<div class="row justify-content-center mb-3">
			<div class="col-lg-6 col-md-12 col-12">
				{#if loading}
					<Loader />
				{/if}
			</div>
		</div>
		{#if form?.response}
			<div class="row justify-content-center">
				<div class="col-lg-6 col-md-12 col-12">
					<div class="card">
						<div class="card-body">
							<h3>{form?.response.author}</h3>
							<p>{form?.response.description}</p>
							<div class="mt-3">
								<a href={form?.response.media} class="btn btn-video mb-3" target="_blank"
									>Download Video</a
								>
								<a href={form?.response.music} class="btn btn-music" target="_blank"
									>Download Music</a
								>
							</div>
						</div>
					</div>
				</div>
			</div>
		{/if}
		{#if form?.error === true}
			<div class="row justify-content-center">
				<div class="col-lg-6 col-md-12 col-12">
					<div class="card">
						<div class="card-body">
							<h3>{form?.message}</h3>
						</div>
					</div>
				</div>
			</div>
		{/if}
	</div>
</section>
