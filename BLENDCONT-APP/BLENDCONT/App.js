import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Intro from './ui/inicio/Intro';
import Inicio from './ui/inicio/Inicio';
import PersonalAdmi from './ui/personal/PersonalAdmi';
import PersonalCrear from './ui/personal/PersonalCrear';
import PersonalCrearFunciones from './ui/personal/PersonalCrearFunciones';
import PersonalList from './ui/personal/PersonalList';

import PersonalTotal from './ui/personal/Personal_total';
import PersonalInfo from './ui/personal/Personal_info';
import PersonalInfoFunciones from './ui/personal/Personal_info_funciones';
import PersonalEditar from './ui/personal/Personal_editar';
import PersonalEditarFunciones from './ui/personal/Personal_editar_funciones';


//login
import Login from './ui/login/Login'

//registro
import OlvidoContrasenia from './ui/registro/OlvidoContrasenia'
import OlvidoContraseniaEmail from './ui/registro/OlvidoContraseniaEmail'
import OlvidoCambiarContrasenia from './ui/registro/OlvidoCambiarContrasenia'
import RegistrarRestaurante from './ui/registro/RegistrarRestaurante'
import RegistrarDuenio from './ui/registro/RegistrarDuenio'
import BienvenidoRegistro from './ui/registro/BienvenidoRegistro'

//inventario
import Inventario from './ui/inventario/Inventario'
import Anadir from './ui/inventario/Anadir'
import Stock_total from './ui/inventario/Stock_total'
import Ingrediente_info from './ui/inventario/Ingrediente_info'

//platillos
import Platillo from './ui/Platillos/Platillo'
import Anadir_platillo from './ui/Platillos/Anadir_platillo'
import Anadir_platillo2 from './ui/Platillos/Anadir_platillo2'
import Preparacion_platillo from './ui/Platillos/Preparacion_platillo'
import Ver_platillo from './ui/Platillos/Ver_platillo'
import Lista_platillos from './ui/Platillos/Lista_platillos'

//dia operacional
import Dia_operacional from './ui/Dia_operacional/Dia_operacional'
import Crear_dia_op from './ui/Dia_operacional/Crear_dia_op'
import En_curso_dia_op from './ui/Dia_operacional/En_curso_dia_op'
import Terminar_dia_op from './ui/Dia_operacional/Terminar_dia_op'
import Chart1 from './ui/Dia_operacional/Chart1'
import Chart2 from './ui/Dia_operacional/Chart2'

// InformeS
import Informes from './ui/Informes/Informes'
import Thechart from './ui/Informes/Thechart'

//random
import Prueba from './ui/Prueba/Prueba'

const Stack = createStackNavigator();


class BlendCont extends Component {
	render() {
		return (
			<NavigationContainer initialRouteName="Intro">
				<Stack.Navigator screenOptions={{ headerShown: false	}}>
					{/* <Stack.Screen name="Intro" component={Intro} options={{headerShown: false}}	/> */}
					
					<Stack.Screen name="Intro" component={Intro} />
					<Stack.Screen name="Inicio" component={Inicio} />
					<Stack.Screen name="PersonalAdmi" component={PersonalAdmi} />
					<Stack.Screen name="PersonalCrear" component={PersonalCrear} />
					<Stack.Screen name="PersonalList" component={PersonalList} />
          <Stack.Screen name="PersonalCrearFunciones" component={PersonalCrearFunciones} />

					<Stack.Screen name="Login" component={Login} />
					<Stack.Screen name="OlvidoContrasenia" component={OlvidoContrasenia} />
					<Stack.Screen name="OlvidoContraseniaEmail" component={OlvidoContraseniaEmail} />
					<Stack.Screen name="OlvidoCambiarContrasenia" component={OlvidoCambiarContrasenia} />
					<Stack.Screen name="RegistrarRestaurante" component={RegistrarRestaurante} />
					<Stack.Screen name="RegistrarDuenio" component={RegistrarDuenio} />
					<Stack.Screen name="BienvenidoRegistro" component={BienvenidoRegistro} />

					<Stack.Screen name="PersonalTotal" component={PersonalTotal} />
					<Stack.Screen name="PersonalInfo" component={PersonalInfo} />
					<Stack.Screen name="PersonalInfoFunciones" component={PersonalInfoFunciones} />
					<Stack.Screen name="PersonalEditar" component={PersonalEditar} />
					<Stack.Screen name="PersonalEditarFunciones" component={PersonalEditarFunciones} />
					
					<Stack.Screen name="Inventario" component={Inventario}/>
					<Stack.Screen name="Ingrediente_info" component={Ingrediente_info}/>
					<Stack.Screen name="Anadir" component={Anadir}/>
					<Stack.Screen name="Stock_total" component={Stock_total}/>

					<Stack.Screen name="Platillo" component={Platillo}/>
					<Stack.Screen name="Preparacion_platillo" component={Preparacion_platillo}/>
					<Stack.Screen name="Anadir_platillo" component={Anadir_platillo}/>
					<Stack.Screen name="Anadir_platillo2" component={Anadir_platillo2}/>
					<Stack.Screen name="Ver_platillo" component={Ver_platillo}/>
					<Stack.Screen name="Lista_platillos" component={Lista_platillos}/>

					<Stack.Screen name="Dia_operacional" component={Dia_operacional} />
					{/* <Stack.Screen name="Crear_dia_op" component={Crear_dia_op} /> */}
					<Stack.Screen name="En_curso" component={En_curso_dia_op} />
					{/* <Stack.Screen name="Terminar_dia_op" component={Terminar_dia_op} /> */}
					{/* <Stack.Screen name="Chart1" component={Chart1} /> */}
					
					<Stack.Screen name="Informes" component={Informes} />
					<Stack.Screen name="Thechart" component={Thechart} />

					{/* <Stack.Screen name="Header1" component={Header1} />}
					<Stack.Screen name="Header2" component={Header2} /> */}
					
				</Stack.Navigator>
    	</NavigationContainer>
		)
	}
}

export default BlendCont;
