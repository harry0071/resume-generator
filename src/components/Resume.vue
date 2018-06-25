<template>
    <div class=content-bd>
        <div class=content-left>
            <section class=practice>
                <header class=section-hd>
                    <span class=section-title-l></span>
                    <h2 class="section-title" :contenteditable="mode==='edit'" @blur="$emit('changeResume','titles[0]',$event)">{{resume.titles[0]}}</h2>
                    <span class=section-title-r></span>
                </header>
                <div class=section-bd>
                    <div class=item v-for="(practice,i) in resume.practices">
                        <header class=item-hd>
                            <span class=item-time :contenteditable="mode==='edit'"  @blur="$emit('changeResume','practices['+i+'].time',$event)">{{practice.time}}</span>
                            <h3 class=item-name :contenteditable="mode==='edit'"  @blur="$emit('changeResume','practices['+i+'].company',$event)">{{practice.company}}</h3>
                            <button class="del" v-if="i>2 && mode==='edit'" @click="$emit('deleteItem','practices',i)">×</button>
                        </header>
                        <div class=item-bd>
                            <p class=section-content :contenteditable="mode==='edit'"  @blur="$emit('changeResume','practices['+i+'].description',$event)">{{practice.description}}</p>
                        </div>
                    </div>
                    <button class="add" v-if="mode==='edit'" @click="$emit('addItem','practices')">+</button>
                </div>
            </section>

            <section class=project>
                <header class=section-hd>
                    <span class=section-title-l></span>
                    <h2 class="section-title" :contenteditable="mode==='edit'"  @blur="$emit('changeResume','titles[1]',$event)">{{resume.titles[1]}}</h2>
                    <span class=section-title-r></span>
                </header>
                <div class=section-bd>
                    <div class=item v-for="(project,i) in resume.projects">
                        <header class=item-hd>
                            <span class=item-time :contenteditable="mode==='edit'"  @blur="$emit('changeResume','projects['+i+'].time',$event)">{{project.time}}</span>
                            <a class="btn item-more" :href="project.link" target=_blank >项目链接</a>
                            <input class="item-more" type="text" v-model="project.link" title="必须以http开头" placeholder="网址必须以http开头" v-if="mode==='edit'">
                            <h3 class=item-name :contenteditable="mode==='edit'" @blur="$emit('changeResume','projects['+i+'].work',$event)">{{project.art}}</h3>
                            <button class="del" v-if="i>2 && mode==='edit'" @click="$emit('deleteItem','projects',i)">×</button>
                        </header>
                        <div class=item-bd>
                            <p class=section-content :contenteditable="mode==='edit'"  @blur="$emit('changeResume','projects['+i+'].description',$event)">{{project.description}}</p>
                        </div>
                    </div>
                    <button class="add" v-if="mode==='edit'" @click="$emit('addItem','projects')">+</button>
                </div>
            </section>

            <section class=skill>
                <header class=section-hd>
                    <span class=section-title-l></span>
                    <h2 class="section-title" :contenteditable="mode==='edit'" @blur="$emit('changeResume','titles[2]',$event)">{{resume.titles[2]}}</h2>
                    <span class=section-title-r></span>
                </header>
                <div class=section-bd>
                    <ul class=section-list>
                        <li v-for="(skill,i) in resume.skills"><p class=section-content :contenteditable="mode==='edit'" @blur="$emit('changeResume','skills['+i+']',$event)"><i class="iconfont icon-dot"></i>{{skill}}</p><button class="del" v-if="i>2 && mode==='edit'" @click="$emit('deleteItem','skills',i)">×</button></li>
                    </ul>
                    <button class="add" v-if="mode==='edit'" @click="$emit('addItem','skills')">+</button>
                </div>
            </section>

            <section class=prize>
                <header class=section-hd>
                    <span class=section-title-l></span>
                    <h2 class="section-title" :contenteditable="mode==='edit'" @blur="$emit('changeResume','titles[3]',$event)">{{resume.titles[3]}}</h2>
                    <span class=section-title-r></span>
                </header>
                <div class=section-bd>
                    <div class=item v-for="(prize,i) in resume.prizes">
                        <header class=item-hd>
                            <span class=item-time :contenteditable="mode==='edit'" @blur="$emit('changeResume','prizes['+i+'].time',$event)">{{prize.time}}</span>
                            <h3 class=item-name :contenteditable="mode==='edit'" @blur="$emit('changeResume','prizes['+i+'].description',$event)">{{prize.description}}</h3>
                            <button class="del" v-if="i>2 && mode==='edit'" @click="$emit('deleteItem','prizes',i)">×</button>
                        </header>
                    </div>
                    <button class="add" v-if="mode==='edit'" @click="$emit('addItem','prizes')">+</button>
                    </div>
                </section>
        </div>
        <header class="content-right content-hd">

            <section class=title>
                <img class=avator :src="resume.imgUrl">
                <div class="file-container" v-if="mode==='edit'">点击上传头像<input id="file" type="file" @change="$emit('saveImg')"></div>
                <div class=name>
                    <h1 :contenteditable="mode==='edit'" @blur="$emit('changeResume','name',$event)">{{resume.name}}</h1>
                </div>
               <h2 class="job" :contenteditable="mode==='edit'" @blur="$emit('changeResume','job',$event)">{{resume.job}}</h2>
            </section>

            <section class=info>
                <div v-for="(info,i) in resume.infos">
                   <h2 :contenteditable="mode==='edit'" @blur="$emit('changeResume','infos['+i+']',$event)">{{info}}</h2>
                   <button class="del" v-if="i>2 && mode==='edit'" @click="$emit('deleteItem','infos',i)">×</button>
                </div>
                
                <button class="add" v-if="mode==='edit'" @click="$emit('addItem','infos')">+</button>
            </section>

            <section class="skill-level">
                <div class="skillbar-container" v-for="(skillbar,i) in resume.skillbars">
                   <h3 :contenteditable="mode==='edit'" @blur="$emit('changeResume','skillbars['+i+'].name',$event)">{{skillbar.name}}</h3>
                <div class="item" :style="mode==='edit'?'':'width:260px;'">
                    <i class="in" :style="{flex:skillbar.flex/10}"></i><i class="out" :style="{flex:(100-skillbar.flex)/10}"></i>
                </div>
                <div class="input-container"><input type="text" v-model.number="skillbar.flex" v-if="mode==='edit'">{{mode==='edit'?'%':''}}</div>
                <button class="del" v-if="i>2 && mode==='edit'" @click="$emit('deleteItem','skillbars',i)">×</button>
            </div>
            <button class="add" v-if="mode==='edit'" @click="$emit('addItem','skillbars')">+</button>
            </section>

            <section class=contact>
                <ul>
                    <li v-for="(contact,i) in resume.contacts">
                        <a href="javascript:;" target=_blank>
                            <i class="iconfont" :class="contact.icon"></i>
                            <span class=contact-link :contenteditable="mode==='edit'" @blur="$emit('changeResume','contacts['+i+'].link',$event)">{{contact.link}}</span>
                        </a>
                        <button class="del" v-if="i>4 && mode==='edit'" @click="$emit('deleteItem','contacts',i)">×</button>
                    </li>
                    <button class="add" v-if="mode==='edit'" @click="$emit('addItem','contacts')">+</button>
                </ul>
            </section>
        </header>
    </div>
</template>

<script>
    export default {
        props:['mode','resume'],
    }
</script>