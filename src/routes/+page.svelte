<script lang="ts">
  import { Textarea, ToolbarButton } from 'flowbite-svelte';
  import { Icon } from 'flowbite-svelte-icons';
  import ChatHistory from '$lib/components/ChatHistory.svelte';
  import ChatMessage from '$lib/components/ChatMessage.svelte';
  import { chatMessages, answer } from '$lib/stores/chat-messages';

  let query = '';

  const handleSubmit = async () => {
    answer.set('...');
    await chatMessages.set(query);
    query = '';
  };
</script>

<section class="flex max-w-6xl w-full pt-4 justify-center">
  <div class="flex flex-col gap-2">
    <ChatHistory />
  </div>

  <div class="flex flex-col w-full px-8 items-center gap-2">
    <div
      class="h-[700px] w-full bg-black bg-opacity-20 rounded-md p-4 overflow-y-auto flex flex-col gap-4"
    >
      <div class="flex flex-col gap-2">
        {#each $chatMessages.messages as message}
          <ChatMessage type={message.role} message={message.content} />
        {/each}

        {#if $answer}
          <ChatMessage type="assistant" message={$answer} />
        {/if}
      </div>
    </div>
    <form
      on:submit|preventDefault={handleSubmit}
      class="flex w-full rounded-md gap-4 bg-black bg-opacity-20 p-2"
    >
      <Textarea type="text" bind:value={query} class="w-full" rows="1" />
      <ToolbarButton
        type="submit"
        color="blue"
        class="rounded-full text-primary-600 dark:text-primary-500"
      >
        <Icon name="papper-plane-outline" class="w-5 h-5 rotate-45" />
        <span class="sr-only">Send message</span>
      </ToolbarButton>
    </form>
  </div>
</section>
