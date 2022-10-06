<template>
  <div class="flex flex-row bg-fundo">
    <div id="menu" class="bg-verde p-2 flex flex-col gap-1">
      <span class="font-bold text-3xl">Menu</span>
      <button class="hover:bg-verde2 text-left p-2 font-medium border-l border-verde2 rounded">
        Opção
      </button>
      <button class="hover:bg-verde2 text-left p-2 font-medium border-l border-verde2 rounded">
        Opção
      </button>
      <button class="hover:bg-verde2 text-left p-2 font-medium border-l border-verde2 rounded">
        Opção
      </button>
      <button class="hover:bg-verde2 text-left p-2 font-medium border-l border-verde2 rounded">
        Opção
      </button>
      <button class="hover:bg-verde2 text-left p-2 font-medium border-l border-verde2 rounded">
        Opção
      </button>
    </div>
    <div class="flex flex-col p-2">
      <button class="bg-verde">
        Mostrar novas publicações
      </button>
      <div class="">
        <div id="publicacao" class="p-4 m-2 mb-4 bg-white shadow-lg shadow-gray-300 flex flex-col rounded-md">
          <div class="grid grid-cols-5 gap-5 mb-2 ">
            <div class="col-span-2 flex flex-col flex-initial gap-3">
              <div id="identidade" class="flex flex-row items-center gap-5">
                <img class="object-cover h-20 rounded-full" src="../assets/perfil.jpeg" alt="Ver perfil">
                <div class="flex flex-col flex-initial gap-3">
                  <span class="font-bold text-3xl">Andreo Naymayer</span>
                  <span class="font-medium text-2xl">1 de Janeiro de 2022</span>
                </div>
              </div>
              <p class="mt-5 mb-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a diam pharetra leo
                dictum vehicula. Nullam mattis, ligula sit amet vestibulum blandit, lorem lorem elementum nisi, sed
                ultricies risus lacus finibus nisl. Donec mauris elit, aliquet non augue sed, iaculis congue leo. Etiam
                ullamcorper euismod ultricies. In aliquam tempus quam ut porttitor. Integer feugiat volutpat felis at
                scelerisque. Nullam ultrices ullamcorper nibh, a tincidunt massa ultricies id. Aliquam vehicula mi
                porttitor.</p>
            </div>
            <img class="col-span-3 andressa items-center bg-red-500" src="../assets/wide.jpeg"
                 alt="Imagem da publicação">
          </div>
          <div class="flex gap-2">
            <button class="flex-1 bg-verde2 hover:bg-verde2 text-left p-2 font-medium rounded">
              Opção
            </button>
            <button class="flex-1 bg-verde2 hover:bg-verde2 text-left p-2 font-medium rounded">
              Opção
            </button>
            <button class="flex-1 bg-verde2 hover:bg-verde2 text-left p-2 font-medium rounded">
              Opção
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FeedView"
}
</script>

<style scoped>

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
