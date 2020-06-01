@extends('layouts.app')

@section('content')
<div class="container main">
    <div class="card" >
        <div class="card-header">
            <div class="details_name">Caption Book</div>
            <div>Caption book en</div>
        </div>


        <ul class="list-group list-group-flush">
            <li class="list-group-item">
                <div class="row">
                    <div class="col-md-3">
                        <div>
                            <img class="img" src="/images/book.jpg" width="100%">
                        </div>
                        <div>
                            <button type="button" class="btn btn-outline-primary btn_start_read">Читать</button>
                        </div>
                    </div>
                    <div class="col-md-9">
                        <div class="row">
                            <div class="col-md-6">
                                <div>
                                    <div class="details_caption">Опубликовано</div>
                                    <div class="details_value">03.05.2019</div>
                                </div>
                                <div>
                                    <div class="details_caption">Жанр</div>
                                    <div class="details_value">Приключения, Фэнтези</div>
                                </div>
                                <div>
                                    <div class="details_caption">Рейтинг</div>
                                    <div class="details_value">
                                        <span>Лайков: 284</span>
                                        <span>Дизайков: 28224</span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div>
                                    <div class="details_caption">Автор:</div>
                                    <div class="details_value">Наби Кегок</div>
                                </div>
                                <div>
                                    <div class="details_caption">Страна:</div>
                                    <div class="details_value">Южная Корея</div>
                                </div>
                            </div>
                        </div>

                        <ul class="nav nav-tabs" id="myTab" role="tablist">
                            <li class="nav-item" role="presentation">
                                <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Описание</a>
                            </li>
                            <li class="nav-item" role="presentation">
                                <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Информация о книге</a>
                            </li>
                        </ul>
                        <div class="tab-content" id="myTabContent">
                            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad dignissimos doloribus, excepturi, exercitationem id incidunt laborum natus officiis quas quis quod reiciendis similique soluta ut voluptatem. Corporis laboriosam officia quos!
                            </div>
                            <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">.fdsfdsfdsf.</div>
                            <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">..sdfdsfds.</div>
                        </div>
                    </div>

                </div>
            </li>
            <li class="list-group-item">
                <div class="card">
                    <div class="card-header">
                        Список глав
                    </div>
                    <ul class="list-group list-group-flush" style="height: 400px; overflow: auto;">
                        <li class="list-group-item">Глава 405. Ради моего Господина <span class="details_glav_time">5 часов назад</span></li>
                        <li class="list-group-item">Глава 405. Ради моего Господина <span class="details_glav_time">26 мая</span></li>
                        <li class="list-group-item">Глава 405. Ради моего Господина <span class="details_glav_time">26 мая</span></li>
                        <li class="list-group-item">Глава 405. Ради моего Господина <span class="details_glav_time">26 мая</span></li>
                        <li class="list-group-item">Глава 405. Ради моего Господина <span class="details_glav_time">26 мая</span></li>
                        <li class="list-group-item">Глава 405. Ради моего Господина <span class="details_glav_time">26 мая</span></li>
                        <li class="list-group-item">Глава 405. Ради моего Господина <span class="details_glav_time">26 мая</span></li>
                        <li class="list-group-item">Глава 405. Ради моего Господина <span class="details_glav_time">26 мая</span></li>
                        <li class="list-group-item">Глава 405. Ради моего Господина <span class="details_glav_time">26 мая</span></li>
                        <li class="list-group-item">Глава 405. Ради моего Господина <span class="details_glav_time">26 мая</span></li>
                        <li class="list-group-item">Глава 405. Ради моего Господина <span class="details_glav_time">26 мая</span></li>
                        <li class="list-group-item">Глава 405. Ради моего Господина <span class="details_glav_time">26 мая</span></li>
                        <li class="list-group-item">Глава 405. Ради моего Господина <span class="details_glav_time">26 мая</span></li>
                    </ul>
                </div>

            </li>

            <li class="list-group-item">
                <div class="comment_caption">Коментарии</div>
                <div>

                    <div class="row comment_block">
                        <div class="col-md-1" style="text-align: center">
                            <img src="/images/book.jpg" class="comment_avatar">
                        </div>
                        <div class="col-md-11">
                            <div class="comment_nickname">User #2222</div>
                            <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci architecto beatae blanditiis cum deleniti eos error exercitationem fugit nam neque provident quae quam, quasi qui quod similique vitae. Consectetur, dolorem?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci architecto beatae blanditiis cum deleniti eos error exercitationem fugit nam neque provident quae quam, quasi qui quod similique vitae. Consectetur, dolorem?</div>
                        </div>
                    </div>

                    <div class="row comment_block">
                        <div class="col-md-1" style="text-align: center">
                            <img src="/images/book.jpg" class="comment_avatar">
                        </div>
                        <div class="col-md-11">
                            <div class="comment_nickname">User #2222</div>
                            <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci architecto beatae blanditiis cum deleniti eos error exercitationem fugit nam neque provident quae quam, quasi qui quod similique vitae. Consectetur, dolorem?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci architecto beatae blanditiis cum deleniti eos error exercitationem fugit nam neque provident quae quam, quasi qui quod similique vitae. Consectetur, dolorem?</div>
                        </div>
                    </div>


                </div>
            </li>
        </ul>
    </div>

<!--    <div class="block">-->
<!--        <div class="row">-->
<!--            <div class="col-md-2">-->
<!--                <div>-->
<!--                    <img class="img" src="/images/book.jpg" width="100%">-->
<!--                </div>-->
<!--                <div>-->
<!--                    <button type="button" class="btn btn-outline-primary btn_read">Читать</button>-->
<!--                </div>-->
<!--            </div>-->
<!--            <div class="col-md-10">-->
<!--                <div class="caption"><a href="/">Caption</a></div>-->
<!--                <div class="tags">-->
<!--                    <span class="glava">Глава 1</span>-->
<!--                    <span class="glaval_name">еучеуеу</span>-->
<!--                </div>-->
<!--                <div class="description">Цивилизация была уничтожена, а записи утеряны. Только Дудянь выжил, погруженный в криогенный сон. Триста лет спустя Дудянь проснулся и должен был стать Дэанем, чтобы выжить. Разве может он хоть кому-нибудь доверять в мире, населенном монстрами, как явными, так и ...</div>-->
<!--            </div>-->
<!--        </div>-->
<!--    </div>-->
<!---->
<!--    <div class="block">-->
<!--        <div class="row">-->
<!--            <div class="col-md-2">-->
<!--                <div>-->
<!--                    <img class="img" src="/image.png" width="100%">-->
<!--                </div>-->
<!--                <div>-->
<!--                    <button type="button" class="btn btn-outline-primary btn_read">Читать</button>-->
<!--                </div>-->
<!--            </div>-->
<!--            <div class="col-md-10">-->
<!--                <div class="caption"><a href="/">Caption</a></div>-->
<!--                <div class="tags">-->
<!--                    <span class="glava">Глава 1</span>-->
<!--                    <span class="glaval_name">еучеуеу</span>-->
<!--                </div>-->
<!--                <div class="description">Цивилизация была уничтожена, а записи утеряны. Только Дудянь выжил, погруженный в криогенный сон. Триста лет спустя Дудянь проснулся и должен был стать Дэанем, чтобы выжить. Разве может он хоть кому-нибудь доверять в мире, населенном монстрами, как явными, так и ...</div>-->
<!--            </div>-->
<!--        </div>-->
<!--    </div>-->
<!---->
<!---->
<!--    <div class="block">-->
<!--        <div class="row">-->
<!--            <div class="col-md-2">-->
<!--                <div>-->
<!--                    <img class="img" src="/image.png" width="100%">-->
<!--                </div>-->
<!--                <div>-->
<!--                    <button type="button" class="btn btn-outline-primary btn_read">Читать</button>-->
<!--                </div>-->
<!--            </div>-->
<!--            <div class="col-md-10">-->
<!--                <div class="caption"><a href="/">Caption</a></div>-->
<!--                <div class="tags">-->
<!--                    <span class="glava">Глава 1</span>-->
<!--                    <span class="glaval_name">еучеуеу</span>-->
<!--                </div>-->
<!--                <div class="description">Цивилизация была уничтожена, а записи утеряны. Только Дудянь выжил, погруженный в криогенный сон. Триста лет спустя Дудянь проснулся и должен был стать Дэанем, чтобы выжить. Разве может он хоть кому-нибудь доверять в мире, населенном монстрами, как явными, так и ...</div>-->
<!--            </div>-->
<!--        </div>-->
<!--    </div>-->
</div>
@endsection
