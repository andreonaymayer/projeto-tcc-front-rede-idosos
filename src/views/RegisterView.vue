<template>
  <div>
    <div class="flex flex-col text-center mb-5 items-center">
      <h1 class="not-italic font-bold titulo text-6xl ">Que bom que chegou até aqui.</h1>
      <p class="font-medium text-3xl w-7/10">
        Precisamos de algumas informações para criar o seu perfil,
        preencha os campos abaixo.</p>
      <p class="font-medium text-3xl w-4/5"> Ao registrar-se, estará pronto para usar nossa rede.</p>
    </div>
    <div class="grid grid-cols-1">
      <div class="col-span-1">
        <div id="bloco" class="shadow rounded-50 bg-verde m-10 gap-1 pt-5 p-10">
          <div class="grid grid-cols-2 gap-5">
            <div id= "esquerda" class="col-span-1">
              <form class="flex flex-col gap-6" action="">
                <label class="flex flex-col gap-0 font-medium text-2xl">Nome
                  <input class="rounded-50 border h-56" type="text">
                </label>
                <label class="flex flex-col gap-0 font-medium text-2xl">E-mail
                  <input class="rounded-50 border h-56" type="text">
                </label>
                <label class="flex flex-col gap-0 font-medium text-2xl">Senha
                  <input class="rounded-50 border h-56" type="text">
                </label>
                <label class="flex flex-col gap-0 font-medium text-2xl">Data de nascimento
                  <input class="rounded-50 border h-56" type="text">
                </label>
              </form>
            </div>
            <div id="direita">
              <form class="flex flex-col gap-6" action="">
                <label class="flex flex-col gap-0 font-medium text-2xl">Nome
                  <input class="rounded-50 border h-56" type="text">
                </label>
                <label class="flex flex-col gap-0 font-medium text-2xl">E-mail
                  <input class="rounded-50 border h-56" type="text">
                </label>
                <button class="hover:bg-azul_hover rounded-25 font-medium text-4xl bg-azul h-88 gap-3 text-white flex flex-row justify-center items-center text-center">
                  Registrar
                </button>
                <button class="hover:bg-azul1_hover rounded-25 font-medium text-4xl bg-azul1 h-88 gap-3 text-white flex flex-row justify-center items-center text-center">
                  Já sou cadastrado
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "RegisterView"
}
</script>

<style scoped>

.titulo {
  line-height: 88px;
}

</style>
