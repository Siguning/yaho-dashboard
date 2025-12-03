<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
</svelte:head>

<div class="bg-slate-950 text-slate-300 min-h-screen flex flex-col selection:bg-emerald-500 selection:text-white">
    <nav class="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <div class="flex items-center gap-3">
                <div class="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <h1 class="text-xl font-bold tracking-tighter text-white">YAHO <span class="text-slate-500 text-sm font-normal">Global Database</span></h1>
            </div>
            <div class="flex items-center gap-6 text-xs">
                <span class="text-emerald-500">● SYSTEM ONLINE</span>
                <span class="text-slate-500">ID: R-0921 (Lv.3 Clearance)</span>
            </div>
        </div>
    </nav>
    {@render children()}
</div>
<style>
    /* 전역 폰트 강제 적용 */
    :global(body) {
        font-family: 'JetBrains Mono', monospace;
    }

    /* 스캔 라인 효과 복구 */
    :global(.scan-line) {
        background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.1));
        background-size: 100% 4px;
    }
</style>