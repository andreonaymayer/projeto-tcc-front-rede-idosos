<template>
  <div>
    <div class="text-center mb-5">
      <h1 class="not-italic font-bold titulo text-6xl ">Bem-vindo ao Rede idosos!</h1>
      <p class="font-medium text-3xl">Indentifique-se e entre, ou registre-se caso ainda não tenha um cadastro.</p>
    </div>
    <div class="grid grid-cols-2">
      <div class="col-span-1">

        <div id="bloco" class="bg shadow rounded-50 bg-verde flex flex-col m-10 gap-1 pt-5 p-10">
          <p class="font-bold text-2xl text-center">Identificação</p>
          <form class="flex flex-col gap-4" action="">
            <label class="flex flex-col gap-0 font-medium text-2xl">E-mail
              <input class="rounded-50 border h-56" type="text">
            </label>
            <label class="flex flex-col gap-0 font-medium text-2xl">Senha
              <input class="rounded-50 border h-56" type="text">
            </label>
            <button class="hover:bg-azul_hover rounded-25 font-medium text-4xl bg-azul h-88 gap-3 text-white flex flex-row justify-center items-center text-center">
              Entrar
            </button>
            <button class="hover:bg-azul1_hover rounded-25 font-medium text-4xl bg-azul1 h-88 gap-3 text-white flex flex-row justify-center items-center text-center">
              Não lembro minha senha
            </button>
          </form>
        </div>
      </div>

      <div class="col-span-1 p-52 flex flex-col justify-center  text-center gap-6">
        <span class="font-bold text-2xl text-center leading-10">Não tem cadastro? Clique no botão abaixo para se registrar.</span>
        <button class="hover:bg-azul_hover rounded-25 font-medium text-4xl bg-azul h-88 gap-3 text-white flex flex-row justify-center items-center text-center">
          Registrar
        </button>
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
