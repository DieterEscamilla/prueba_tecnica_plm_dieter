const endPointGetProfessions=`https://www.plmconnection.com/devplmservices/RestPLMClientsEngine/RestPLMClientsEngine.svc/getProfessions`;
const endPointGetSpecialities=`https://www.plmconnection.com/devplmservices/RestPLMClientsEngine/RestPLMClientsEngine.svc/getSpecialities?professionId=7`;
const endPointGetCountries=`https://www.plmconnection.com/devplmservices/RestPLMClientsEngine/RestPLMClientsEngine.svc/getCountries`;
const selectProfession=document.getElementById('select_profession'),
selectEspecialidad=document.getElementById('select_especialidad'),
selectPais=document.getElementById('select_pais'),
selectEstado=document.getElementById('select_estado'),
selectLocation=document.getElementById('select_location'),
form=document.getElementById('form');

form.addEventListener('submit',(e)=>{
  e.preventDefault();
  formData=new FormData(form);
  const regExEmail=/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  console.log(formData.get('email'));
  if(regExEmail.test(formData.get('email'))){
    console.log(formData.email);
  formData.forEach(item=>{
    console.log(item)
  });
  }else{
    alert('El formato del correo electrónico es inválido.');
  }
});
const btnUpdateForm=document.getElementById('btn_update_form').addEventListener('click',(e)=>{
  // updateForm();
});
getProfessions();
getCountries(endPointGetCountries);
selectProfession.addEventListener('change',(e)=>{
  if(e.target.value=='MÉDICO'){
    const selectGroupCedulaProfesional=document.getElementById('select_group_cedula_profesional').style.display='flex';
    const selectGroupEspecialidad=document.getElementById('select_group_especialidad').style.display='flex';
    getSpecialities();

  }else{
    const selectGroupCedulaProfesional=document.getElementById('select_group_cedula_profesional').style.display='none';
    selectEspecialidad.innerHTML='';
    const selectGroupEspecialidad=document.getElementById('select_group_especialidad').style.display='none';
  }
});
selectPais.addEventListener('change',(e)=>{
  // selectPais.innerHTML='';
  selectEstado.innerHTML='';
  selectLocation.innerHTML='';
  console.log(e.target.dataset.idPais);
  const endPointGetStates=`https://www.plmconnection.com/devplmservices/RestPLMClientsEngine/RestPLMClientsEngine.svc/getStateByCountry?countryId=${e.target.value}`;
  // const endPointGetStates=`https://www.plmconnection.com/devplmservices/RestPLMClientsEngine/RestPLMClientsEngine.svc/getStateByCountry?countryId=${e.target.dataset.id}`;

  getStates(endPointGetStates);
});
selectEstado.addEventListener('change',(e)=>{
  // selectEstado.innerHTML='';
  const endPointGetLocations=`https://www.plmconnection.com/devplmservices/RestPLMClientsEngine/RestPLMClientsEngine.svc/getLocationsByState?stateId=${e.target.value}`;
  // const endPointGetLocations=`https://www.plmconnection.com/devplmservices/RestPLMClientsEngine/RestPLMClientsEngine.svc/getLocationsByState?stateId=${e.target.dataset.id}`;

  getLocations(endPointGetLocations);
});


function getProfessions(){
  fetch(endPointGetProfessions,{
    method:'GET',
    headers:{
      "Content-Type":"application/json"
    }
  }).then(res=>res.json())
    .then(data=>{
      data.getProfessionsResult.forEach(item=>{
      selectProfession.innerHTML+=`
        <option value="${item.ProfessionName}">${item.ProfessionName}</option>
      `;
      });
      
    })
    .catch(err=>console.log(err));
}
function getSpecialities(){
  fetch(endPointGetSpecialities,{
    method:'GET',
    headers:{
      "Content-Type":"application/json"
    }
  }).then(res=>res.json())
    .then(data=>{
      data.getSpecialitiesResult.forEach(item=>{
        selectEspecialidad.innerHTML+=`
        <option value="${item.SpecialityName}">${item.SpecialityName}</option>
      `;
      });
      
    })
    .catch(err=>console.log(err));
}
function getCountries(endPointGetCountries){
  fetch(endPointGetCountries,{
    method:'GET',
    headers:{
      "Content-Type":"application/json"
    }
  }).then(res=>res.json())
    .then(data=>{
      data.getCountriesResult.forEach(item=>{
        selectPais.innerHTML+=`
        <option value="${item.CountryId}" data-idPais="${item.CountryId}">${item.CountryName}</option>
      `;
      });
    })
    .catch(err=>console.log(err));
}
function getStates(endPointGetState){
  selectEstado.innerHTML='';
  fetch(endPointGetState,{
    method:'GET',
    headers:{
      "Content-Type":"application/json"
    }
  }).then(res=>res.json())
    .then(data=>{
      if(data.getStateByCountryResult.length==0){
        selectEstado.innerHTML=`<option value="">No hay datos disponibles para este país.</option>`;
      }else{
        data.getStateByCountryResult.forEach(item=>{
          selectEstado.innerHTML+=`
          <option value="${item.StateId}" data-id="${item.StateId}">${item.StateName}</option>
        `;
        });
      }
    })
    .catch(err=>console.log(err));
}
function getLocations(endPointGetLocations){
  selectLocation.innerHTML='';
  fetch(endPointGetLocations,{
    method:'GET',
    headers:{
      "Content-Type":"application/json"
    }
  }).then(res=>res.json())
    .then(data=>{
      if(data.getLocationsByStateResult.length==0){
        selectLocation.innerHTML=`<option value="">No hay datos disponibles para esta región.</option>`;
      }else{
        data.getLocationsByStateResult.forEach(item=>{
          selectLocation.innerHTML+=`
          <option value="${item.LocationName}">${item.LocationName}</option>
        `;
        });
      }
    })
    .catch(err=>console.log(err));
}
function updateForm(){
  console.log(formData);
}