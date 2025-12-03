<script lang="ts">
	import { fly, fade } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';
	import { goto } from '$app/navigation';

	const { data } = $props();

	// Reactive derived state
	let objectData = $derived(data.objectData);
	let sidebarAnomalies = $derived(data.sidebarAnomalies);

	// Search state
	let searchQuery = $state('');

	function handleSearch(e: KeyboardEvent) {
		if (e.key === 'Enter' && searchQuery) {
			goto(`/?id=${searchQuery}`);
		}
	}

	// YAHO Classification System
	const INTELLIGENCE_LEVELS = [
		{ label: 'None', desc: '지능 없음' },
		{ label: 'Instinct', desc: '동물 수준 (생존 본능)' },
		{ label: 'Sentient', desc: '문제 해결 가능 (도구 사용)' },
		{ label: 'Sapient', desc: '인간 수준 (복합적 사고)' },
		{ label: 'Transcendent', desc: '인간 그 이상 (미래 예측/집단 의식)' }
	];

	const HOSTILITY_LEVELS = [
		{ label: 'Neutral', desc: '적대적이지 않음' },
		{ label: 'Defensive', desc: '공격받을 때만 반격' },
		{ label: 'Conditional', desc: '특정 조건하에 적대' },
		{ label: 'Volatile', desc: '기분파, 무차별 (예측 불가)' },
		{ label: 'Malicious', desc: '항상 적대적, 살의를 가짐' }
	];

	const RISK_LEVELS = [
		{ label: 'Ignorable', desc: '무시할 정도' },
		{ label: 'Warning', desc: '경고할 정도' },
		{ label: 'Caution', desc: '경계할 정도' },
		{ label: 'Dangerous', desc: '위험할 정도' },
		{ label: 'Awe', desc: '경외할 정도' }
	];

	function getStatInfo(value: number, type: 'intelligence' | 'hostility' | 'risk') {
		const safeValue = Math.max(0, Math.min(4, value));
		if (type === 'intelligence') return INTELLIGENCE_LEVELS[safeValue];
		if (type === 'hostility') return HOSTILITY_LEVELS[safeValue];
		return RISK_LEVELS[safeValue];
	}

	// 게이지 애니메이션 설정
	const intProgress = tweened(0, { duration: 1000, easing: cubicOut });
	const hosProgress = tweened(0, { duration: 1200, easing: cubicOut });
	const rskProgress = tweened(0, { duration: 1400, easing: cubicOut });

	$effect(() => {
		intProgress.set((objectData.stats.intelligence / 4) * 100);
		hosProgress.set((objectData.stats.hostility / 4) * 100);
		rskProgress.set((objectData.stats.risk / 4) * 100);
	});
</script>

<main class="flex-1 max-w-7xl mx-auto w-full p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
	<aside class="lg:col-span-3 space-y-4" in:fly={{ x: -20, duration: 600, delay: 200 }}>
		<div class="relative">
			<input
				type="text"
				placeholder="Search Object ID..."
				class="w-full bg-slate-900 border border-slate-700 rounded px-4 py-2 text-sm focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-slate-600"
				bind:value={searchQuery}
				onkeydown={handleSearch}
			/>
			<div class="absolute right-3 top-2.5 text-slate-600 text-xs">ENTER</div>
		</div>

		<div class="space-y-1">
			{#each sidebarAnomalies as anomaly}
				<a
					href="/?id={anomaly.id}"
					class="block p-3 hover:bg-slate-900/50 border-l-2 {anomaly.id === objectData.id
						? 'bg-emerald-900/20 border-emerald-500 text-emerald-100'
						: 'border-transparent text-slate-500'} cursor-pointer transition-colors"
				>
					<div class="flex justify-between items-center">
						<span class="font-bold">#{anomaly.id} "{anomaly.name}"</span>
						{#if anomaly.risk >= 4}
							<span class="text-[10px] bg-red-900/30 text-red-500 px-1 py-0.5 rounded"
								>CRITICAL</span
							>
						{/if}
					</div>
					<div
						class="text-xs {anomaly.id === objectData.id
							? 'text-emerald-400/70'
							: 'text-slate-600'} mt-1"
					>
						Last Seen: {anomaly.lastSeen}
					</div>
				</a>
			{/each}
		</div>
	</aside>

	<section class="lg:col-span-9 space-y-6">
		<div
			class="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-slate-800 pb-6"
			in:fly={{ y: -10, duration: 600 }}
		>
			<div>
				<div class="flex items-center gap-3 mb-2">
					<span class="bg-slate-800 text-slate-400 text-xs px-2 py-1 rounded"
						>OBJECT #{objectData.id}</span
					>
					<span
						class="bg-amber-900/30 text-amber-500 text-xs px-2 py-1 rounded border border-amber-900/50"
						>CONTAINED</span
					>
				</div>
				<h2 class="text-4xl font-bold text-white mb-1">{objectData.name}</h2>
				<p class="text-slate-500 text-sm">
					Last Observed: {objectData.lastSeen} by {objectData.author}
				</p>
			</div>
			<div class="text-right hidden md:block">
				<button
					class="bg-emerald-600 hover:bg-emerald-700 text-white text-xs px-4 py-2 rounded transition-colors shadow-[0_0_15px_rgba(5,150,105,0.4)]"
				>
					EXPORT LOGS
				</button>
			</div>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
			<div
				class="bg-slate-900 border border-slate-800 p-4 rounded group hover:border-blue-500/50 transition-colors"
				in:fly={{ y: 20, duration: 600, delay: 200 }}
			>
				<div class="text-xs text-slate-500 mb-2 uppercase tracking-wider">Intelligence</div>
				<div class="flex items-end justify-between">
					<span class="text-2xl font-bold text-blue-400">Level {objectData.stats.intelligence}</span
					>
					<span class="text-xs text-blue-300/50 mb-1"
						>{getStatInfo(objectData.stats.intelligence, 'intelligence').label}</span
					>
				</div>
				<div class="w-full bg-slate-800 h-1.5 mt-3 rounded-full overflow-hidden">
					<div
						class="bg-blue-500 h-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"
						style="width: {$intProgress}%"
					></div>
				</div>
				<p class="text-[10px] text-slate-500 mt-2">
					{getStatInfo(objectData.stats.intelligence, 'intelligence').desc}
				</p>
			</div>

			<div
				class="bg-slate-900 border border-slate-800 p-4 rounded group hover:border-red-500/50 transition-colors"
				in:fly={{ y: 20, duration: 600, delay: 300 }}
			>
				<div class="text-xs text-slate-500 mb-2 uppercase tracking-wider">Hostility</div>
				<div class="flex items-end justify-between">
					<span class="text-2xl font-bold text-red-500">Level {objectData.stats.hostility}</span>
					<span class="text-xs text-red-300/50 mb-1"
						>{getStatInfo(objectData.stats.hostility, 'hostility').label}</span
					>
				</div>
				<div class="w-full bg-slate-800 h-1.5 mt-3 rounded-full overflow-hidden">
					<div
						class="bg-red-500 h-full shadow-[0_0_10px_rgba(239,68,68,0.5)]"
						style="width: {$hosProgress}%"
					></div>
				</div>
				<p class="text-[10px] text-slate-500 mt-2">
					{getStatInfo(objectData.stats.hostility, 'hostility').desc}
				</p>
			</div>

			<div
				class="bg-slate-900 border border-slate-800 p-4 rounded group hover:border-amber-500/50 transition-colors"
				in:fly={{ y: 20, duration: 600, delay: 400 }}
			>
				<div class="text-xs text-slate-500 mb-2 uppercase tracking-wider">Risk Level</div>
				<div class="flex items-end justify-between">
					<span class="text-2xl font-bold text-amber-500">Level {objectData.stats.risk}</span>
					<span class="text-xs text-amber-300/50 mb-1"
						>{getStatInfo(objectData.stats.risk, 'risk').label}</span
					>
				</div>
				<div class="w-full bg-slate-800 h-1.5 mt-3 rounded-full overflow-hidden">
					<div
						class="bg-amber-500 h-full shadow-[0_0_10px_rgba(245,158,11,0.5)]"
						style="width: {$rskProgress}%"
					></div>
				</div>
				<p class="text-[10px] text-slate-500 mt-2">
					{getStatInfo(objectData.stats.risk, 'risk').desc}
				</p>
			</div>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8" in:fade={{ duration: 800, delay: 600 }}>
			<div class="space-y-4">
				<h3 class="text-sm font-bold text-white border-l-2 border-emerald-500 pl-3">DESCRIPTION</h3>
				<p class="text-sm leading-relaxed text-slate-400 whitespace-pre-line">
					{objectData.description || 'No description available.'}
				</p>
			</div>
			<div class="space-y-4">
				<h3 class="text-sm font-bold text-white border-l-2 border-amber-500 pl-3">
					CONTAINMENT PROTOCOL
				</h3>
				<ul class="text-sm space-y-2 text-slate-400 list-disc list-inside marker:text-amber-500">
					{#if objectData.containmentProtocol}
						{@html objectData.containmentProtocol}
					{:else}
						<li>No protocol defined.</li>
					{/if}
				</ul>
			</div>
		</div>

		<div
			class="mt-8 p-1 bg-slate-900 border border-slate-800 rounded h-64 relative overflow-hidden flex items-center justify-center"
			in:fade={{ duration: 1000, delay: 800 }}
		>
			<div class="absolute inset-0 scan-line opacity-20 pointer-events-none"></div>
			<div class="text-center">
				<div class="text-6xl mb-4 opacity-20">📷</div>
				<p class="text-xs text-slate-600">NO VISUAL DATA AVAILABLE</p>
				<p class="text-[10px] text-slate-700">CAM_04 CORRUPTED</p>
			</div>
		</div>
	</section>
</main>
