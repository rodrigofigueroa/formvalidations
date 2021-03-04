
function startForm(){
  const form      = document.querySelector( 'form' ),
        inputs    = form.querySelectorAll( 'input' ),
        btnC      = form.querySelectorAll( 'button[data-inp="continue"]'),
        btnStart  = form.querySelectorAll( 'button[data-inp="start"]'),
        regex     = {
          credit_card: /^(([0-9]{4}) ([0-9]{4}) ([0-9]{4}) ([0-9]{4})( ?))$/,
          phone: /^([0-9]{2}) ([0-9]{2}) ([0-9]{2}) ([0-9]{2}) ([0-9]{2})( ?)$/,
          email: /^(.)+@(.)+\.(.)+$/,
          confirm_email: /^(.)+@(.)+\.(.)+$/
        },
        check     = {
          credit_card: false,
          phone: false,
          email: false,
          confirm_email: false,
          body: {
            credit_card: '',
            phone: '',
            email: ''
          },
          transform_c_card: []
        },
        check2    = {
          promotion: false
        }
    const addSpaceToNumbers = ( number = 4, string ) => {
      const regex = new RegExp( `[0-9]{${ number }}`, 'gi' )
      return string.replace( /\s+/gi, '').replace( regex, '$& ' )
    }
    function useRegexToCheck( input, regex, value ) {
      if( !regex.test( value ) ){
        check[ input.name ] = false
        input.classList.add( 'error' )
      }else{
        check[ input.name ] = true
        input.classList.remove( 'error' )
      }
    }
    function checkEachInput( e ){
      const { key, target } = e
      switch( target.name ){
        case 'credit_card':
          if( key === 'Backspace' || key === 'Delete' ){
            useRegexToCheck( target, regex[ target.name ], target.value )
          }else{
            target.value = addSpaceToNumbers( 4, target.value )
            useRegexToCheck( target, regex[ target.name ], target.value )
          }
          return
        case 'phone':
          return
        case 'email':
          return
        case 'confirm_email':
          return
        default :
          return
      }
    }
  inputs.forEach( input => input.addEventListener( 'keyup', checkEachInput ) )
}

window.addEventListener( 'load', startForm )