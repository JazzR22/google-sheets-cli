Ámbito de permisos: En el código auth.js, el ámbito (scope) está configurado para trabajar solo con Google Sheets. Si necesitas más permisos, agrégalos al array scope.
Mantenimiento: Si tu token expira, se regenerará automáticamente al ejecutar el script.


npm install googleapis
npm install -g  //Registra scripts (google-sheets-cli) como comando global en el sistema
                //Para listar comandos globales: npm list -g --depth=0

---------------------------------------------

Generar claves de cuenta de servicio, una vez hecho:
claves -> agregar clave -> JSON 
y renombramos a service-account.json

Darle a compartir a la sheet y compartirla con el mail que sale en client_email en service-account.json

----------------------------------------------
-------Nuevo proceso separado:

Start-Process node -ArgumentList "index.js"

Ejecucion:
google-sheets-cli read <spreadsheetId> <range>

----------------------------------------------
-------En el proceso actual:

Ejecucion: 
node index.js read/write <spreadsheetId> <range>

- Ejemplo lectura:
node index.js read "1spqCeeeeeeeeeeexampleeeeeeeeeeeeexFS5AL7rvXW-w" "Sheet1!A1:Z1000"

MOSTRAR ELEMENTOS OCULTOS AÑADIENDO BOOLEANO AL FINAL
node index.js read "1spqCeeeeeeeeeeexampleeeeeeeeeeeeexFS5AL7rvXW-w" "Sheet1!A1:Z1000" false

node index.js write "1spqCeeeeeeeeeeexampleeeeeeeeeeeeexFS5AL7rvXW-w" "Sheet1!A1:B3" "[['TODO','NADA'],['ES','ES'],['MENTIRA','VERDAD']]"


