@extends('front.layouts.main')

<!-- *************************** -->
<!-- ***** Head | Sections ***** -->
<!-- *************************** -->
@section('htmlClass')
desktop win mozilla oc30 is-guest route-account-register store-0 skin-1 desktop-header-active compact-sticky mobile-sticky layout-6 one-column column-right
@endsection

@section('Title')
{{__('home.Reset Password')}}
@endsection

@section('TitleURL')
  {{ url('/login')}}
@endsection

@section('TitleImage')
  {{ URL::to('/front') }}/image/catalog/logo/10-2x-600x315h.png
@endsection

@section('TitleDesc')
Reset Password
@endsection

@section('cssAssets')
7e57e9b00b1eabc084a21e4dd7387162fdc9.css?v=7f711446
@endsection

@section('cssfile')
style
@endsection

@section('jsAssets')
c4cd4981133c7c0f792cf762de2922c8fdc9.js?v=7f711446
@endsection


@section('jsLibraries')
@endsection


@section('content')
    <ul class="breadcrumb">
      <li><a href="{{ url('/') }}"><i class="fa fa-home"></i>{{__('home.Home')}}</a></li>
      <li><a href="">{{__('home.Reset Password')}}</a></li>
    </ul>
    <h1 class="title page-title"><span>{{__('home.Reset Password')}}</span></h1>

    <div id="account-register" class="container">
        <div class="row">
            <div id="content" class="col-sm-9 register-page">
                <p>{{__('home.Enter a new password.')}}</p>
                <p>{{__('home.Remember your password?')}}
                    <a href="{{ route('login')}} " class="RedHover">{{__('home.Login')}} </a>.
                </p>

                <form method="POST" action="{{ route('password.update') }}">
                    @csrf
                    <input type="hidden" name="token" value="{{ $token }}">
                    
                    <div class="form-group required padLeft2 account-email">
                        <label class="col-sm-2 control-label" for="input-email">{{__('home.E-Mail')}}</label>
                        <div class="col-sm-12">
                          <input type="email" name="email" value="{{ old('email') }}" required placeholder="{{__('home.E-Mail')}}" id="input-email"
                            class="form-control @error('email') is-invalid @enderror" />
                            <strong id="emailMessage" class="ErrorMessage"></strong>
                            @error('email')
                            <span class="invalid-feedback ErrorMessage" role="alert">
                              <strong>{{ $message }}</strong>
                            </span>
                          @enderror
                        </div>
                    </div>

                    <div class="form-group required padLeft2 account-password">
                        <label class="col-sm-2 control-label" for="input-password">{{__('home.Password')}}</label>
                        <div class="col-sm-12">
                          <input type="password" name="password" value="{{ old('password') }}" required placeholder="{{__('home.Password')}}" id="input-password"
                            class="form-control @error('password') is-invalid @enderror" autocomplete="new-password"/>
                            @error('password')
                            <span class="invalid-feedback ErrorMessage" role="alert">
                              <strong>{{ $message }}</strong>
                            </span>
                          @enderror
                        </div>
                    </div>

                    <div class="form-group required padLeft2 account-password-confirm">
                        <label class="col-sm-2 control-label" for="password-confirm">{{__('home.Confirm Password')}}</label>
                        <div class="col-sm-12">
                          <input type="password" name="password_confirmation" required autocomplete="new-password" placeholder="{{__('home.Confirm Password')}}" id="password-confirm"
                            class="form-control" />
                        </div>
                    </div>

                    <div class="mt-4 text-center">
                      <button type="submit" class="btn btn-block btn-danger" ><span>{{__('home.Reset Password')}}</span></button>
                    </div>
                </form>
                </div>
            </div>
        </div>
    </div>
@endsection

<!-- ******************* -->
<!-- ***** Scripts ***** -->
<!-- ******************* -->
@section('jsFooterScripts')
<script  src="{{ asset('front') }}/theme/assets/608bdd2a8e5cf8cd74b96d306c67d941fdc9.js?v=7f711446" defer></script>
<script  src="{{ asset('front') }}/js/register.js"></script>

</body>
</html>
@endsection

