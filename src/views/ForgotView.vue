<template>
  <div>
    <div class="text-center mb-5">
      <h1 class="not-italic font-bold titulo text-6xl ">Esqueceu a senha?</h1>
      <p class="font-medium text-3xl">Indentifique-se e entre, ou registre-se caso ainda não tenha um cadastro.</p>
    </div>
      <div class="">
        <div id="bloco" class="shadow rounded-50 bg-verde flex flex-col m-10 gap-1 pt-5 p-10">
          <p class="font-bold text-2xl text-center">Identificação</p>
          <form class="flex flex-col gap-4 ml-1/4 mr-1/4" action="">
            <label class="flex flex-col gap-0 font-medium text-2xl mb-10">E-mail
              <input class="rounded-50 border h-56" type="text">
            </label>
            <button
                class="hover:bg-azul_hover rounded-25 font-medium text-4xl bg-azul h-88 gap-3 text-white flex flex-row justify-center items-center text-center">
              Entrar
            </button>
            <a href="/login" class="hover:bg-azul1_hover rounded-25 font-medium text-4xl bg-azul1 h-88 gap-3 text-white flex flex-row justify-center items-center text-center">
              Voltar para identificação
            </a>
          </form>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
export default {
  name: "LoginView"
}
</script>

<style scoped>

.titulo {
  line-height: 88px;
}

</style>
