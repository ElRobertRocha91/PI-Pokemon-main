export default function Validation(input){
    //Defino un obejto al cual le vamos a pasar todos los errores que detectemos:
    let errors = {};

    //Valido
    if(input.name.length  < 4 || input.name.length > 25){
        errors.name = "Name must be between 4 and 25 characters";
    }
    if(input.live < 1 || input.live > 275){
        errors.live = "Live must be between 1 and 275";
    }
    if(input.attack < 1 || input.attack > 275){
        errors.attack = "Attack must be between 1 and 275";
    }
    if(input.defense < 1 || input.defense > 275){
        errors.defense = "Defense must be between 1 and 275";
    }
    if(input.velocity < 0 || input.velocity > 275){
        errors.velocity = "Velocity must be between 0 and 275";
    }
    if(input.height < 0 || input.height > 275){
        errors.height = "Height must be between 0 and 275";
    }
    if(input.weight < 0 || input.weight > 275){
        errors.weight = "Weight must be between 0 and 275";
    }
    if(input.image && !/^http.+.\.(jpg|jpeg|gif|png|webp)$/.test(input.image)){
        errors.image = "Image invalid";
    }
    //En la validación de los types, va a tener un maxino de 2 y un minimo de 1
    if(input.types.length > 2 || input.types.length < 1){
        errors.types = "Only a max 2 and a min 1";
    }
    return errors;
}