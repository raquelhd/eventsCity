import React from 'react'
import { Text, SafeAreaView, View,  Pressable, StyleSheet } from 'react-native'

import { formatearFecha} from '../helpers'


const InformationEventCity = ({eventCity, setEventCity, setModalEventCity}) => {
    
    return (
        <SafeAreaView
            style={styles.contenedor}
        >
           <Text style={styles.titulo}>Informacion {''}
               <Text style={styles.tituloBold}>Evento</Text>
            </Text>

            <View>
                <Pressable
                    style={styles.btnCerrar}
                    onLongPress={() => {
                        setModalEventCity(false)
                        setEventCity({})
                    }}
                >
                    <Text
                        style={styles.btnCerrarTexto}
                    >X Cerrar</Text>
                </Pressable>
            </View>
            <View
                style={styles.contenido}
            >
                <View style={styles.campo}>
                    <Text style={styles.label}>Nombre:</Text>
                    <Text style={styles.valor}>{eventCity.eventName}</Text>
                </View>

                <View style={styles.campo}>
                    <Text style={styles.label}>Propietario:</Text>
                    <Text style={styles.valor}>{eventCity.propietario}</Text>
                </View>
                
                <View style={styles.campo}>
                    <Text style={styles.label}>Email:</Text>
                    <Text style={styles.valor}>{eventCity.email}</Text>
                </View>

                <View style={styles.campo}>
                    <Text style={styles.label}>Teléfono:</Text>
                    <Text style={styles.valor}>{eventCity.telefono}</Text>
                </View>

                <View style={styles.campo}>
                    <Text style={styles.label}>Fecha Alta:</Text>
                    <Text style={styles.valor}>{formatearFecha(eventCity.fecha)}</Text>
                </View>

                <View style={styles.campo}>
                    <Text style={styles.label}>Descripcion:</Text>
                    <Text style={styles.valor}>{eventCity.sintomas}</Text>
                </View>

            </View>
           
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    contenedor: {
        backgroundColor: '#F59E0B',
        flex: 1
    },
    titulo: {
        fontSize: 30,
        fontWeight: '600',
        textAlign: 'center',
        marginTop: 30,
        color: '#FFF'
    },
    tituloBold: {
        fontWeight: '900'
    },
    btnCerrar: {
        marginVertical: 30,
        backgroundColor: '#E06900',
        marginHorizontal: 30,
        padding: 15,
        borderRadius: 10,
    },
    btnCerrarTexto: {
        color: '#FFF',
        textAlign: 'center',
        fontWeight: '900',
        fontSize: 16,
        textTransform: 'uppercase',
    },
    contenido: {
        backgroundColor: '#FFF',
        marginHorizontal: 30,
        borderRadius: 10,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    campo: {
        marginBottom: 10
    },
    label: {
        textTransform: 'uppercase',
        color: '#374151',
        fontWeight: '600',
        fontSize: 12
    },
    valor: {
        fontWeight: '700',
        fontSize: 20,
        color: '#334155'
    }
})


export default InformationEventCity
