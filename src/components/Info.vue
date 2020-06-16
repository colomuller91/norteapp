<template>
    <v-container fluid onresize="onresize" class="pa-sm-1 pt-md-5 px-md-2 fill-height">
        <v-row no-gutters>
            <v-col cols="12" md="6" offset-md="3" class="pa-4 pt-1">
                <p class="display-1 font-weight-bold">
                    NorteApp v0.3
                </p>
                <br>
                <p>
                    <b>NorteApp</b> es una app multiplataforma para gestionar tus pedidos y ventas.
                </p>
                <p>
                    Está orientada a los pequeños emprendimientos para brindar una manera FÁCIL y RÁPIDA de gestionar tu actividad.
                </p>
                <p>
                    NorteApp es una iniciativa <br>
                    <v-hover v-slot:default="{ hover }">
                        <span>
                            <v-icon class="title ml-n6 black--text" style="vertical-align: sub" :style="hover? 'opacity:1' : 'opacity:0'">mdi-github-circle</v-icon>&nbsp;
                            <a class="li-link font-weight-bold black--text" href="https://www.github.com/colomuller91/norteapp" tag="a">OPEN-SOURCE</a>
                        </span>
                    </v-hover>
                    y <b>GRATUITA</b>.
                </p>
                <br><br>
                <p>¿Necesitás ayuda para usarla?</p>
                <p class="title mb-0">Juan Pablo Müller</p>
                <p class="mb-1 social wa-link" onclick="location.href='https://api.whatsapp.com/send?phone=543445441341'"><v-icon class="mr-2" style="vertical-align: text-bottom">mdi-whatsapp</v-icon>+54 3445 441341</p>
                <p class="mb-1"><v-icon class="mr-2">mdi-email</v-icon>colomuller91@gmail.com</p>
                <p class="mb-1 social li-link" onclick="location.href='https://www.linkedin.com/in/colomu'"><v-icon class="mr-2" style="vertical-align:sub">mdi-linkedin</v-icon>/colomu</p>
            </v-col>
        </v-row>
    </v-container>
</template>
<style scoped>
    p{
        text-align: center;
    }
    .social{
        transition: color .2s;
        cursor: pointer;
    }
    .social.wa-link:hover{
        color: green;
    }
    .social.li-link:hover{
        color: darkblue;
    }
</style>
