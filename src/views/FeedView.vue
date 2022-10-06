<template>
  <div class="flex bg-fundo">
    <div class="p-2 flex flex-col gap-1">
      <span class="font-bold text-3xl">Menu</span>
      <button class="hover:bg-verde text-left p-2 font-medium border-l border-verde2 rounded shadow shaddow-black"
      style="white-space: nowrap;">
        Opção legal demais
      </button>

    </div>
    <div class="flex flex-col pt-2 pl-2 pr-2">
      <button class="hover:bg-verde2 hover:text-white bg-verde ml-2 mr-2 rounded-50 shaddow mb-2">
        Mostrar novas publicações
      </button>
      <div class="post-scrool-margin">
        <div class=" p-4 m-3 bg-white shadow-lg shadow-gray-500 flex flex-col rounded-md">
          <div class="flex gap-5 mb-2 ">
            <div class="flex flex-col flex-initial gap-3">
              <div class="flex flex-row items-center gap-5">
                <img class="object-cover h-20 rounded-full" src="../assets/perfil.jpeg" alt="Ver perfil">
                <div class="flex flex-col flex-initial gap-3">
                  <span class="font-bold text-3xl">Andreo Naymayer</span>
                  <span class="font-medium text-2xl">1 de Janeiro de 2022</span>
                </div>
              </div>
              <p class="mt-5 mb-5 font-medium text-xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                a diam
                pharetra leo
                dictum vehicula. Nullam mattis, ligula sit amet vestibulum blandit, lorem lorem elementum nisi, sed
                ultricies risus lacus finibus nisl. Donec mauris elit, aliquet non augue sed, iaculis congue leo. Etiam
                ullamcorper euismod ultricies. In aliquam tempus quam ut porttitor. Integer feugiat volutpat felis at
                scelerisque. Nullam ultrices ullamcorper nibh, a tincidunt massa ultricies id. Aliquam vehicula mi
                porttitor.</p>
            </div>
            <img class="object-contain items-center" src="../assets/ney.jpeg"
                 alt="Imagem da publicação"
                 style="max-height: 34rem;max-width: 34rem;min-height: 34rem; min-width: 34rem;">
          </div>
          <div class="flex gap-2">
            <button class="hover:bg-azul flex-1 bg-verde2 hover:bg-verde2 text-left text-white p-2 font-medium rounded">
              Interessante
            </button>
            <button class="hover:bg-azul flex-1 bg-verde2 hover:bg-verde2 text-left text-white p-2 font-medium rounded">
              Interessante
            </button>
            <button class="hover:bg-azul flex-1 bg-verde2 hover:bg-verde2 text-left text-white p-2 font-medium rounded">
              Interessante
            </button>
          </div>
        </div>
        <div class=" p-4 m-3 bg-white shadow-lg shadow-gray-500 flex flex-col rounded-md">
          <div class="flex gap-5 mb-2 ">
            <div class="flex flex-col flex-initial gap-3">
              <div class="flex flex-row items-center gap-5">
                <img class="object-cover h-20 rounded-full" src="../assets/perfil.jpeg" alt="Ver perfil">
                <div class="flex flex-col flex-initial gap-3">
                  <span class="font-bold text-3xl">Andreo Naymayer</span>
                  <span class="font-medium text-2xl">1 de Janeiro de 2022</span>
                </div>
              </div>
              <p class="mt-5 mb-5 font-medium text-xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                a diam
                pharetra leo
                dictum vehicula. Nullam mattis, ligula sit amet vestibulum blandit, lorem lorem elementum nisi, sed
                ultricies risus lacus finibus nisl. Donec mauris elit, aliquet non augue sed, iaculis congue leo. Etiam
                ullamcorper euismod ultricies. In aliquam tempus quam ut porttitor. Integer feugiat volutpat felis at
                scelerisque. Nullam ultrices ullamcorper nibh, a tincidunt massa ultricies id. Aliquam vehicula mi
                porttitor.</p>
            </div>
            <img class="object-contain items-center" src="../assets/imagem_exemplo_1.jpeg"
                 alt="Imagem da publicação"
                 style="max-height: 34rem;max-width: 34rem;min-height: 34rem; min-width: 34rem;">
          </div>
          <div class="flex gap-2">
            <button class="hover:bg-azul flex-1 bg-verde2 hover:bg-verde2 text-left text-white p-2 font-medium rounded">
              Interessante
            </button>
            <button class="hover:bg-azul flex-1 bg-verde2 hover:bg-verde2 text-left text-white p-2 font-medium rounded">
              Interessante
            </button>
            <button class="hover:bg-azul flex-1 bg-verde2 hover:bg-verde2 text-left text-white p-2 font-medium rounded">
              Interessante
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "FeedView"
}
</script>

<style scoped>
.post-scrool-margin {
  overflow-y: scroll;

}

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, .5);
  border-radius: 10px;
}
.andressa {
  /*object-fit: fill;*/
  object-fit: contain;
  /*object-fit: cover;*/
  /*object-fit: none;*/
  /*object-fit: scale-down;*/
  background-color: black;
  height: 30rem;
}
</style>
