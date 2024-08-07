document.addEventListener('DOMContentLoaded', ()=>{
    const mostrarCrearUsuarioFormBtn = document.getElementById('mostrarCrearUsuarioFormBtn')
    const crearUsuarioForm = document.getElementById('crearUsuarioForm')
    const editarUsuarioForm= document.getElementById('editarUsuarioForm')
    const listarUsuariosBtn = document.getElementById('listarUsuariosBtn')
    const listaUsuarios = document.getElementById('listaUsuarios')
    const buscarIdBtn = document.getElementById('buscarIdBtn')

    //mostrar formulario de carga de usuario
    mostrarCrearUsuarioFormBtn.addEventListener('click', ()=>{
        crearUsuarioForm.classList.toggle('hidden');
        editarUsuarioForm.classList.add('hidden')
    })

    //crear usuario
    crearUsuarioForm.addEventListener('submit', async (e)=>{
        e.preventDefault();//no actualiza la pagina
        const formData =  new FormData(crearUsuarioForm);//guarda todos los datos que hay en un formulario
        const data = {
            nombre: formData.get('nombre'),
            apellido: formData.get('apellido'),
            mail: formData.get('mail')
        };
        const response = await fetch('/usuarios', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        alert(result.message);
        crearUsuarioForm.reset();
        crearUsuarioForm.classList.add('hidden');
        listarUsuarios();
    });

    //editar usuario
    editarUsuarioForm.addEventListener('submit', async (e)=>{
        e.preventDefault();
        const formData=new FormData(editarUsuarioForm);
        const data = {
            nombre: formData.get('editNombre'),
            apellido: formData.get('editApellido'),
            mail: formData.get('editEmail')
        };
        const response = await fetch(`/usuarios/${document.getElementById('editID').value}`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        alert(result.message);
        editarUsuarioForm.reset();
        editarUsuarioForm.classList.add('hidden');
        listarUsuarios();
    });

    //buscar usuario
/////////////////////////////////////
    buscarIdBtn.addEventListener('click', buscarUsuario);
    async function buscarUsuario(){
        //e.preventDefault();
        const id2 = parseInt(document.getElementById('buscarId').value);
        const response = await fetch(`/usuarios/${id2}`);
        const usuario = await response.json();
        
        //const usuario1=JSON.stringify(usuario);
        
        //usuarios.forEach(usuario => {
        
        if (usuario.Mensaje != "Usuario no existe."){
            listaUsuarios.innerHTML = '';
            const li = document.createElement('li');
            li.innerHTML = `
                <span>ID: ${usuario[0].id}, 
                      Nombre: ${usuario[0].nombre}, 
                      Apellido: ${usuario[0].apellido}, 
                      Email: ${usuario[0].mail}
                </span>
                <div class="actions">
                    <button class='update' data-id="${usuario[0].id}" data-nombre="${usuario[0].nombre}" data-apellido="${usuario[0].apellido}" data-mail="${usuario[0].mail}"> Editar </button>
                    <button class='delete' data-id="${usuario[0].id}"> Borrar </button>
                </div>`;
            console.log(usuario)
            
            listaUsuarios.appendChild(li); 
        }else{
            listaUsuarios.innerHTML = '';
            alert(usuario.Mensaje);
        }
          
        //});
        
        document.querySelectorAll('.update').forEach(button =>{
            button.addEventListener('click', (e)=>{
                const id = e.target.getAttribute('data-id');
                const nombre = e.target.getAttribute('data-nombre');
                const apellido = e.target.getAttribute('data-apellido');
                const mail = e.target.getAttribute('data-mail');
                document.getElementById('editID').value = e.target.getAttribute('data-id');
                document.getElementById('editNombre').value=e.target.getAttribute('data-nombre');
                document.getElementById('editApellido').value=e.target.getAttribute('data-apellido');
                document.getElementById('editEmail').value=e.target.getAttribute('data-mail');
                editarUsuarioForm.classList.remove('hidden')
            });
        });

        document.querySelectorAll('.delete').forEach(button =>{
            button.addEventListener('click', async (e)=>{
                const id = e.target.getAttribute('data-id');
                const response = await fetch(`/usuarios/${id}`,{
                    method: 'DELETE'
                });
                const result = await response.json();
                alert(result.Mensaje);
                listarUsuarios();

            });
        });
    };
/////////////////////////////////////
    //listar los usuarios
    listarUsuariosBtn.addEventListener('click', listarUsuarios);
    async function listarUsuarios(){
        const response = await fetch('/usuarios');
        const usuarios = await response.json();

        listaUsuarios.innerHTML = '';

        usuarios.forEach(usuario => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>ID: ${usuario.id}, 
                      Nombre: ${usuario.nombre}, 
                      Apellido: ${usuario.apellido}, 
                      Email: ${usuario.mail}
                </span>
                <div class="actions">
                    <button class='update' data-id="${usuario.id}" data-nombre="${usuario.nombre}" data-apellido="${usuario.apellido}" data-mail="${usuario.mail}"> Editar </button>
                    <button class='delete' data-id="${usuario.id}"> Borrar </button>

                </div>                
            `;
            listaUsuarios.appendChild(li);
        });

        document.querySelectorAll('.update').forEach(button =>{
            button.addEventListener('click', (e)=>{
                const id = e.target.getAttribute('data-id');
                const nombre = e.target.getAttribute('data-nombre');
                const apellido = e.target.getAttribute('data-apellido');
                const mail = e.target.getAttribute('data-mail');
                document.getElementById('editID').value = e.target.getAttribute('data-id');
                document.getElementById('editNombre').value=e.target.getAttribute('data-nombre');
                document.getElementById('editApellido').value=e.target.getAttribute('data-apellido');
                document.getElementById('editEmail').value=e.target.getAttribute('data-mail');
                crearUsuarioForm.classList.add('hidden');
                editarUsuarioForm.classList.remove('hidden')
            });
        });

        document.querySelectorAll('.delete').forEach(button =>{
            button.addEventListener('click', async (e)=>{
                const id = e.target.getAttribute('data-id');
                const response = await fetch(`/usuarios/${id}`,{
                    method: 'DELETE'
                });
                const result = await response.json();
                alert(result.Mensaje);
                listarUsuarios();

            });
        });
    };
});
