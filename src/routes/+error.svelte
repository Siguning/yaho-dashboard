<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="min-h-screen bg-black text-red-500 flex flex-col items-center justify-center p-4 font-mono relative overflow-hidden">
	<div class="absolute inset-0 pointer-events-none opacity-10">
		{#each Array(20) as _, i}
			<div 
				class="absolute h-px bg-red-500 w-full"
				style="top: {Math.random() * 100}%; animation: scan 2s linear infinite; animation-delay: {Math.random() * 2}s;"
			></div>
		{/each}
	</div>

	<div class="z-10 text-center space-y-6 max-w-lg w-full border border-red-900/50 p-8 bg-red-950/10 backdrop-blur-sm rounded-lg shadow-[0_0_50px_rgba(220,38,38,0.2)]">
		<div class="text-6xl font-bold mb-2 glitch-text" data-text={$page.status}>{$page.status}</div>
		
		<div class="h-px w-full bg-red-900/50 my-4"></div>
		
		<h1 class="text-2xl font-bold uppercase tracking-widest text-red-400">System Failure</h1>
		
		<p class="text-red-300/70 text-sm">
			{$page.error?.message || 'Unknown Error Occurred'}
		</p>

		<div class="text-xs text-red-900 mt-8 font-mono">
			ERROR_CODE: 0x{$page.status.toString(16).toUpperCase()}
			<br>
			TIMESTAMP: {new Date().toISOString()}
		</div>

		<a href="/" class="inline-block mt-8 px-6 py-2 border border-red-500/50 hover:bg-red-500/10 hover:border-red-400 text-red-400 text-sm transition-all duration-300 uppercase tracking-wider">
			Return to Safety
		</a>
	</div>
</div>

<style>
	@keyframes scan {
		0% { transform: translateY(-100%); opacity: 0; }
		50% { opacity: 1; }
		100% { transform: translateY(100%); opacity: 0; }
	}

	.glitch-text {
		position: relative;
	}
	
	.glitch-text::before,
	.glitch-text::after {
		content: attr(data-text);
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	.glitch-text::before {
		left: 2px;
		text-shadow: -1px 0 #00ffea;
		clip: rect(24px, 550px, 90px, 0);
		animation: glitch-anim-2 3s infinite linear alternate-reverse;
	}

	.glitch-text::after {
		left: -2px;
		text-shadow: -1px 0 #ff00ea;
		clip: rect(85px, 550px, 140px, 0);
		animation: glitch-anim 2.5s infinite linear alternate-reverse;
	}

	@keyframes glitch-anim {
		0% { clip: rect(14px, 9999px, 127px, 0); }
		20% { clip: rect(84px, 9999px, 5px, 0); }
		40% { clip: rect(10px, 9999px, 126px, 0); }
		60% { clip: rect(38px, 9999px, 46px, 0); }
		80% { clip: rect(117px, 9999px, 33px, 0); }
		100% { clip: rect(63px, 9999px, 94px, 0); }
	}

	@keyframes glitch-anim-2 {
		0% { clip: rect(65px, 9999px, 119px, 0); }
		20% { clip: rect(12px, 9999px, 83px, 0); }
		40% { clip: rect(54px, 9999px, 44px, 0); }
		60% { clip: rect(104px, 9999px, 12px, 0); }
		80% { clip: rect(23px, 9999px, 108px, 0); }
		100% { clip: rect(91px, 9999px, 57px, 0); }
	}
</style>
